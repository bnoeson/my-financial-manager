package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import be.noeson.myfinancialmanager.commons.exception.DuplicateRecordFoundException;
import be.noeson.myfinancialmanager.commons.exception.EmptyLineFoundException;
import be.noeson.myfinancialmanager.utils.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.FieldSet;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BnppfRecordFieldSetMapper implements FieldSetMapper<BnppfRecordEntity> {

    private static final Logger LOG = LoggerFactory.getLogger(BnppfRecordFieldSetMapper.class);

    private BnppfRecordService bnppfRecordService;

    private final static String DATE_FORMAT_PATTERN = "dd/MM/yyyy";

    public BnppfRecordFieldSetMapper(BnppfRecordService bnppfRecordService){
        this.bnppfRecordService = bnppfRecordService;
    }

    @Override
    public BnppfRecordEntity mapFieldSet(FieldSet fieldSet) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT_PATTERN);

        if(fieldSet.toString().equals("[]")){
            throw new EmptyLineFoundException();
        }

        BnppfRecordEntity.Builder builder = new BnppfRecordEntity.Builder()
                .sequenceNumber(fieldSet.readString(0))
                .executionDate(LocalDate.parse(fieldSet.readString(1),formatter))
                .valueDate(LocalDate.parse(fieldSet.readString(2),formatter))
                .amount(NumberUtils.parseCommaSeparatedDecimal(fieldSet.readString(3)))
                .currency(fieldSet.readString(4));

        BnppfRecordEntity record;
        if(fieldSet.getFieldCount() == 7){
            record = builder
                .details(fieldSet.readString(5))
                .accountNumber(fieldSet.readString(6).replaceAll("\\s+",""))
                .build();
        }
        else if (fieldSet.getFieldCount() == 8){
            record = builder
                .counterparty(fieldSet.readString(5))
                .details(fieldSet.readString(6))
                .accountNumber(fieldSet.readString(7).replaceAll("\\s+",""))
                .build();
        }
        else {
            throw new RuntimeException("Record version not implemented : there should be 7 or 8 columns");
        }

        if(this.bnppfRecordService.areDuplicateRecordsPresent(record)){
            LOG.info(MessageFormat.format("Duplicate found : not processing this record (sequenceNumber={0}, accountNumber={1}).",
                    record.getSequenceNumber(), record.getAccountNumber()));
            throw new DuplicateRecordFoundException();
        }

        return record;
    }

}