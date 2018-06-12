package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordFileEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.batch.core.BatchStatus;

import static be.noeson.myfinancialmanager.bnppf.control.BnppfRecordImportBatchConfiguration.RECORD_FILE_ID_PARAMETER_KEY;

@Component
public class BnppfRecordImportJobListener extends JobExecutionListenerSupport {

	private static final Logger log = LoggerFactory.getLogger(BnppfRecordImportJobListener.class);

	@Autowired
	private BnppfRecordFileService bnppfRecordFileService;

	@Override
	public void beforeJob(JobExecution jobExecution) {
		log.info("Job started");
	}

	@Override
	public void afterJob(JobExecution jobExecution) {

		Long recordFileId = jobExecution.getJobParameters().getLong(RECORD_FILE_ID_PARAMETER_KEY);

		log.info("Job terminated with status "+jobExecution.getStatus().toString());
		log.info("Details : "+jobExecution.toString());

		BnppfRecordFileEntity file = bnppfRecordFileService.findById(recordFileId);
		if(BatchStatus.COMPLETED.equals(jobExecution.getStatus())){
			file.markAsProcessed();
		}
		else{
			file.markAsProcessFailed();
		}

		this.bnppfRecordFileService.saveFile(file);
	}
}