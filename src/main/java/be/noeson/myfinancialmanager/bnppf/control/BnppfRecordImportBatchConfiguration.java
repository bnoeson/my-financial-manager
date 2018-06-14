package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordFileEntity;
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
public class BnppfRecordImportBatchConfiguration {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Autowired
    private EntityManagerFactory emf;

    @Autowired
    private BnppfRecordFileService bnppfRecordFileService;

    @Autowired
    private BnppfRecordService bnppfRecordService;

    public final static String RECORD_FILE_ID_PARAMETER_KEY = "recordFileId";

    @Bean
    @StepScope
    public FlatFileItemReader<BnppfRecordEntity> reader(@Value("#{jobParameters['recordFileId']}") final Long recordFileId) {
        FlatFileItemReader<BnppfRecordEntity> reader = new FlatFileItemReader<>();

        BnppfRecordFileEntity file = this.bnppfRecordFileService.findById(recordFileId);

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

        DefaultLineMapper<BnppfRecordEntity> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(";");
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(new BnppfRecordFieldSetMapper(bnppfRecordService));

        reader.setLineMapper(lineMapper);
        reader.setLinesToSkip(1);
        return reader;
    }

    @Bean
    @StepScope
    public BnppfRecordItemProcessor processor() {
        return new BnppfRecordItemProcessor();
    }

    @Bean
    @StepScope
    public JpaItemWriter writer() {
        JpaItemWriter writer = new JpaItemWriter();
        writer.setEntityManagerFactory(emf);
        return writer;
    }

    @Bean
    public Job bnppfRecordImportJob(BnppfRecordImportJobListener listener) {
        return jobBuilderFactory.get("bnppfRecordImportJob")
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
                .<BnppfRecordEntity, BnppfRecordEntity> chunk(10)
                .reader(reader(OVERRIDDEN_BY_EXPRESSION))
                .processor(processor())
                .writer(writer())
                .faultTolerant()
                .skipPolicy(new BnppfRecordImportBatchSkipPolicy())
                .build();
    }
}