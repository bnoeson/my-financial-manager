package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import be.noeson.myfinancialmanager.commons.exception.DuplicateTransactionFoundException;
import be.noeson.myfinancialmanager.commons.exception.EmptyLineFoundException;
import be.noeson.myfinancialmanager.utils.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.FieldSet;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

        if(this.transactionService.areDuplicateTransactionsPresent(transaction)){
            LOG.info(MessageFormat.format("Duplicate found : not processing this transaction (sequenceNumber={0}, accountNumber={1}).",
                    transaction.getSequenceNumber(), transaction.getAccountNumber()));
            throw new DuplicateTransactionFoundException();
        }

        return transaction;
    }

}