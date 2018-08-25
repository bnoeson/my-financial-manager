package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

public class TransactionItemProcessor implements ItemProcessor<TransactionEntity, TransactionEntity> {

    private static final Logger log = LoggerFactory.getLogger(TransactionItemProcessor.class);

    @Override
    public TransactionEntity process(final TransactionEntity transactionEntity) {
        log.info("Processing transaction "+ transactionEntity.getSequenceNumber());
        return transactionEntity;
    }

}