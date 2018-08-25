package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.commons.exception.DuplicateTransactionFoundException;
import be.noeson.myfinancialmanager.commons.exception.EmptyLineFoundException;
import org.springframework.batch.core.step.skip.SkipPolicy;

public class TransactionFileImportBatchSkipPolicy implements SkipPolicy {

    @Override
    public boolean shouldSkip(java.lang.Throwable t, int skipCount){
        return t.getCause() instanceof DuplicateTransactionFoundException || t.getCause() instanceof EmptyLineFoundException;
    }
}
