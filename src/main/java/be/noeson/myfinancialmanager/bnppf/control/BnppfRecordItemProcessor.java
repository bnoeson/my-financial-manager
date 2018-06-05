package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

public class BnppfRecordItemProcessor implements ItemProcessor<BnppfRecordEntity, BnppfRecordEntity> {

    private static final Logger log = LoggerFactory.getLogger(BnppfRecordItemProcessor.class);

    @Override
    public BnppfRecordEntity process(final BnppfRecordEntity bnppfRecordEntity) {
        log.info("Processing record "+ bnppfRecordEntity.getSequenceNumber());
        return bnppfRecordEntity;
    }

}