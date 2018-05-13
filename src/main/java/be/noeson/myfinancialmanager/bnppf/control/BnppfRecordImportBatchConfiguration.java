package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecord;
import be.noeson.myfinancialmanager.utils.NumberUtils;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import javax.sql.DataSource;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Configuration
@EnableBatchProcessing
public class BnppfRecordImportBatchConfiguration {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Autowired
    @Qualifier("dataSource") // https://stackoverflow.com/questions/43455869/could-not-autowire-there-is-more-than-one-bean-of-datasource-type
    private DataSource dataSource;

    private final static String CSV_RESOURCE_PATH = "csv/bnppf-records/";

    @Bean
    public FlatFileItemReader<BnppfRecord> reader() {
        FlatFileItemReader<BnppfRecord> reader = new FlatFileItemReader<>();
        reader.setResource(new ClassPathResource(CSV_RESOURCE_PATH + "test_file.csv"));

        DefaultLineMapper<BnppfRecord> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(";");
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(new BnppfRecordFieldSetMapper());

        reader.setLineMapper(lineMapper);
        reader.setLinesToSkip(1);
        return reader;
    }

    private static class BnppfRecordFieldSetMapper implements FieldSetMapper<BnppfRecord> {
        public BnppfRecord mapFieldSet(FieldSet fieldSet) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            if(fieldSet.getFieldCount() == 7){
                return new BnppfRecord.Builder()
                        .sequenceNumber(fieldSet.readString(0))
                        .executionDate(LocalDate.parse(fieldSet.readString(1),formatter))
                        .valueDate(LocalDate.parse(fieldSet.readString(2),formatter))
                        .amount(NumberUtils.parseCommaSeparatedDecimal(fieldSet.readString(3)))
                        .currency(fieldSet.readString(4))
                        .details(fieldSet.readString(5))
                        .acountNumber(fieldSet.readString(6))
                        .build();
            }
            else if (fieldSet.getFieldCount() == 8){
                return new BnppfRecord.Builder()
                        .sequenceNumber(fieldSet.readString(0))
                        .executionDate(LocalDate.parse(fieldSet.readString(1),formatter))
                        .valueDate(LocalDate.parse(fieldSet.readString(2),formatter))
                        .amount(NumberUtils.parseCommaSeparatedDecimal(fieldSet.readString(3)))
                        .currency(fieldSet.readString(4))
                        .counterPartyAccountNumber(fieldSet.readString(5))
                        .details(fieldSet.readString(6))
                        .acountNumber(fieldSet.readString(7))
                        .build();
            }
            else {
                throw new RuntimeException("Record version not implemented : there should be 7 or 8 columns");
            }
        }
    }

    @Bean
    public BnppfRecordItemProcessor processor() {
        return new BnppfRecordItemProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<BnppfRecord> writer() {
        JdbcBatchItemWriter<BnppfRecord> writer = new JdbcBatchItemWriter<>();
        writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>());
        writer.setSql("INSERT INTO BNPPF_RECORD (SEQUENCE_NR, EXECUTION_DT, VALUE_DT, AMOUNT, CURRENCY, DETAILS, ACCOUNT_NR) " +
                "VALUES (:sequenceNumber, :executionDate, :valueDate, :amount, :currency, :details, :acountNumber)");
        writer.setDataSource(dataSource);
        return writer;
    }

    @Bean
    public Job bnppfRecordImportJob(BnppfRecordImportJobListener listener) {
        return jobBuilderFactory.get("bnppfRecordImportJob")
                .incrementer(new RunIdIncrementer()) // TODO what is that?
                .listener(listener)
                .flow(steps())
                .end()
                .build();
    }

    @Bean
    public Step steps() {
        return stepBuilderFactory.get("steps")
                .<BnppfRecord, BnppfRecord> chunk(10)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }
}