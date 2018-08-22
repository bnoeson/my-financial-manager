package be.noeson.myfinancialmanager.banking.control;

import be.noeson.myfinancialmanager.banking.entity.TransactionEntity;
import be.noeson.myfinancialmanager.commons.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.MessageFormat;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<TransactionEntity> findAll() {
        return transactionRepository.findAll();
    }

    public TransactionEntity findById(Long transactionId) {
        return transactionRepository
                .findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", transactionId));
    }

    public Boolean areDuplicateTransactionsPresent(TransactionEntity transaction){
        List<TransactionEntity> files = this.transactionRepository.
                findBySequenceNumberAndAccountNumber(transaction.getSequenceNumber(), transaction.getAccountNumber());
        if( files.size() > 1 ){
            String message = MessageFormat.format(
                    "More than one transaction found for the following combination : sequenceNumber={0}, accountNumber={1}",
                    transaction.getSequenceNumber(), transaction.getAccountNumber() );
            throw new RuntimeException(message);
        }
        return ! CollectionUtils.isEmpty(files);
    }

}
