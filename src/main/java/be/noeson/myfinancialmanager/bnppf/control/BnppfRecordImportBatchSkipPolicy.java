package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.commons.exception.DuplicateRecordFoundException;
import be.noeson.myfinancialmanager.commons.exception.EmptyLineFoundException;
import org.springframework.batch.core.step.skip.SkipPolicy;

public class BnppfRecordImportBatchSkipPolicy implements SkipPolicy {

    @Override
    public boolean shouldSkip(java.lang.Throwable t, int skipCount){
        return t.getCause() instanceof DuplicateRecordFoundException || t.getCause() instanceof EmptyLineFoundException;
    }
}
