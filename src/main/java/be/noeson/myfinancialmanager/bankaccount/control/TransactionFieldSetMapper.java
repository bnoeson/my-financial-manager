package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import be.noeson.myfinancialmanager.commons.exception.DuplicateTransactionFoundException;
import be.noeson.myfinancialmanager.commons.exception.EmptyLineFoundException;
import be.noeson.myfinancialmanager.utils.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.util.CollectionUtils;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class TransactionFieldSetMapper implements FieldSetMapper<TransactionEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(TransactionFieldSetMapper.class);

    private TransactionService transactionService;

    private final static String DATE_FORMAT_PATTERN = "dd/MM/yyyy";

    public TransactionFieldSetMapper(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @Override
    public TransactionEntity mapFieldSet(FieldSet fieldSet) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT_PATTERN);

        if(fieldSet.toString().equals("[]")){
            throw new EmptyLineFoundException();
        }

        TransactionEntity.Builder builder = new TransactionEntity.Builder()
                .sequenceNumber(fieldSet.readString(0))
                .executionDate(LocalDate.parse(fieldSet.readString(1),formatter))
                .valueDate(LocalDate.parse(fieldSet.readString(2),formatter))
                .amount(NumberUtils.parseCommaSeparatedDecimal(fieldSet.readString(3)))
                .currency(fieldSet.readString(4));

        TransactionEntity transaction;
        if(fieldSet.getFieldCount() == 7){
            transaction = builder
                .details(fieldSet.readString(5))
                .accountNumber(fieldSet.readString(6).replaceAll("\\s+",""))
                .build();
        }
        else if (fieldSet.getFieldCount() == 8){
            transaction = builder
                .counterparty(fieldSet.readString(5))
                .details(fieldSet.readString(6))
                .accountNumber(fieldSet.readString(7).replaceAll("\\s+",""))
                .build();
        }
        else {
            throw new RuntimeException("Transaction version not implemented : there should be 7 or 8 columns");
        }

        if(this.transactionService.isDuplicateTransactionPresent(transaction)){
            LOG.info(MessageFormat.format("Duplicate found : not processing this transaction (sequenceNumber={0}, accountNumber={1}).",
                    transaction.getSequenceNumber(), transaction.getAccountNumber()));
            throw new DuplicateTransactionFoundException();
        }

        transaction = this.handleOppositeTransactions(transaction);

        return transaction;
    }

    private TransactionEntity handleOppositeTransactions(TransactionEntity transaction){

        List<TransactionEntity> oppositeTransactions = this.transactionService.findOppositeNonInternalTransactions(transaction);
        if(! CollectionUtils.isEmpty(oppositeTransactions)){

            oppositeTransactions = oppositeTransactions.stream()
                    .filter(t -> { return ! t.getAccountNumber().equals(transaction.getAccountNumber()); })
                    .filter(t -> { return ! t.getCounterparty().equals(transaction.getCounterparty()); })
                    .collect(Collectors.toList());

            if(! CollectionUtils.isEmpty(oppositeTransactions)){
                TransactionEntity oppositeTransaction = oppositeTransactions.get(0);
                LOG.info(MessageFormat.format("Opposite transaction found for transaction {0} : transaction {1}. Marking them as internal transactions.",
                        transaction.getSequenceNumber(), oppositeTransaction.getSequenceNumber()));

                transaction.markAsInternal();
                oppositeTransaction.markAsInternal();
                this.transactionService.save(oppositeTransaction);
            }
        }
        return transaction;
    }

}