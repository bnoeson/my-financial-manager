package be.noeson.myfinancialmanager.bnppf.control;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.stereotype.Component;

@Component
public class BnppfRecordImportJobListener extends JobExecutionListenerSupport {

	private static final Logger log = LoggerFactory.getLogger(BnppfRecordImportJobListener.class);

	@Override
	public void beforeJob(JobExecution jobExecution) {
		log.info("Job started");
	}

	@Override
	public void afterJob(JobExecution jobExecution) {
		log.info("Job terminated with status "+jobExecution.getStatus().toString());
		log.info("Details : "+jobExecution.toString());
	}
}