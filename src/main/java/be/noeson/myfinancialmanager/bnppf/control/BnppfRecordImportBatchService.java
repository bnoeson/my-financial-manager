package be.noeson.myfinancialmanager.bnppf.control;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import static be.noeson.myfinancialmanager.bnppf.control.BnppfRecordImportBatchConfiguration.RECORD_FILE_ID_PARAMETER_KEY;

@Service
public class BnppfRecordImportBatchService {

    @Autowired
    private Job bnppfRecordImportJob;

    @Autowired
    private JobLauncher jobLauncher;

    @Async
    public void startBatchForId(Long recordFileId) throws Exception{
        jobLauncher.run(
            bnppfRecordImportJob,
            new JobParametersBuilder()
                .addLong(RECORD_FILE_ID_PARAMETER_KEY, recordFileId)
                .toJobParameters());
    }

}
