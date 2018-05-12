package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

public class BnppfRecordItemProcessor implements ItemProcessor<BnppfRecord, BnppfRecord> {

    private static final Logger log = LoggerFactory.getLogger(BnppfRecordItemProcessor.class);

    @Override
    public BnppfRecord process(final BnppfRecord bnppfRecord) throws Exception {
        bnppfRecord.setCurrency(bnppfRecord.getCurrency().toLowerCase());

        log.info("Processing record "+bnppfRecord.getSequenceNumber());

        return bnppfRecord;
    }

}