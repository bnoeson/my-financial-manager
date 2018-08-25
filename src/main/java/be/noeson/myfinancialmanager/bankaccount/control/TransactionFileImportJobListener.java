package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionFileEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.batch.core.BatchStatus;

import static be.noeson.myfinancialmanager.bankaccount.control.TransactionFileImportBatchConfiguration.TRANSACTION_FILE_ID_PARAMETER_KEY;

@Component
public class TransactionFileImportJobListener extends JobExecutionListenerSupport {

	private static final Logger LOG = LoggerFactory.getLogger(TransactionFileImportJobListener.class);

	@Autowired
	private TransactionFileService transactionFileService;

	@Override
	public void beforeJob(JobExecution jobExecution) {
		LOG.info("Job started");
	}

	@Override
	public void afterJob(JobExecution jobExecution) {

		Long transactionFileId = jobExecution.getJobParameters().getLong(TRANSACTION_FILE_ID_PARAMETER_KEY);

		LOG.info("Job terminated with status "+jobExecution.getStatus().toString());
		LOG.info("Details : "+jobExecution.toString());

		TransactionFileEntity file = transactionFileService.findById(transactionFileId);
		if(BatchStatus.COMPLETED.equals(jobExecution.getStatus())){
			file.markAsProcessed();
		}
		else{
			file.markAsProcessFailed();
		}

		this.transactionFileService.saveFile(file);
	}
}