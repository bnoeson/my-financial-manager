package be.noeson.myfinancialmanager.banking.control;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import static be.noeson.myfinancialmanager.banking.control.TransactionFileImportBatchConfiguration.TRANSACTION_FILE_ID_PARAMETER_KEY;

@Service
public class TransactionFileImportBatchService {

    @Autowired
    private Job transactionImportJob;

    @Autowired
    private JobLauncher jobLauncher;

    @Async
    public void startBatchForId(Long transactionFileId) throws Exception{
        jobLauncher.run(
                transactionImportJob,
            new JobParametersBuilder()
                .addLong(TRANSACTION_FILE_ID_PARAMETER_KEY, transactionFileId)
                .toJobParameters());
    }

}
