package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import be.noeson.myfinancialmanager.bankaccount.entity.TransactionFileEntity;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.InputStreamResource;

import javax.persistence.EntityManagerFactory;
import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Configuration
@EnableBatchProcessing
public class TransactionFileImportBatchConfiguration {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Autowired
    private EntityManagerFactory emf;

    @Autowired
    private TransactionFileService transactionFileService;

    @Autowired
    private TransactionService transactionService;

    public final static String TRANSACTION_FILE_ID_PARAMETER_KEY = "transactionFileId";

    @Bean
    @StepScope
    public FlatFileItemReader<TransactionEntity> reader(@Value("#{jobParameters['transactionFileId']}") final Long transactionFileId) {
        FlatFileItemReader<TransactionEntity> reader = new FlatFileItemReader<>();

        TransactionFileEntity file = this.transactionFileService.findById(transactionFileId);

        byte[] stream;
        if(file != null){
            stream = file.getFile();
        }
        else{
            throw new RuntimeException("No file found for this Id!");
        }

        // Convert byte array to input stream
        InputStream is = new ByteArrayInputStream(stream);

        // Create springbatch input stream resource
        InputStreamResource res = new InputStreamResource(is);

        // Set resource
        reader.setResource(res);

        DefaultLineMapper<TransactionEntity> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(";");
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(new TransactionFieldSetMapper(transactionService));

        reader.setLineMapper(lineMapper);
        reader.setLinesToSkip(1);
        return reader;
    }

    @Bean
    @StepScope
    public TransactionItemProcessor processor() {
        return new TransactionItemProcessor();
    }

    @Bean
    @StepScope
    public JpaItemWriter writer() {
        JpaItemWriter writer = new JpaItemWriter();
        writer.setEntityManagerFactory(emf);
        return writer;
    }

    @Bean
    public Job transactionImportJob(TransactionFileImportJobListener listener) {
        return jobBuilderFactory.get("transactionImportJob")
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .flow(steps())
                .end()
                .build();
    }

    private static final Long OVERRIDDEN_BY_EXPRESSION = null;

    @Bean
    public Step steps() {
        return stepBuilderFactory.get("steps")
                .<TransactionEntity, TransactionEntity> chunk(10)
                .reader(reader(OVERRIDDEN_BY_EXPRESSION))
                .processor(processor())
                .writer(writer())
                .faultTolerant()
                .skipPolicy(new TransactionFileImportBatchSkipPolicy())
                .build();
    }
}