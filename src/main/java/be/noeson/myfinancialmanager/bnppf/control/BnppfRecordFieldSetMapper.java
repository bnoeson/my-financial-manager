package be.noeson.myfinancialmanager.bnppf.control;


import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecord;
import be.noeson.myfinancialmanager.utils.NumberUtils;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.FieldSet;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BnppfRecordFieldSetMapper implements FieldSetMapper<BnppfRecord> {

    private final static String DATE_FORMAT_PATTERN = "dd/MM/yyyy";

    @Override
    public BnppfRecord mapFieldSet(FieldSet fieldSet) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT_PATTERN);
        BnppfRecord.Builder builder = new BnppfRecord.Builder()
                .sequenceNumber(fieldSet.readString(0))
                .executionDate(LocalDate.parse(fieldSet.readString(1),formatter))
                .valueDate(LocalDate.parse(fieldSet.readString(2),formatter))
                .amount(NumberUtils.parseCommaSeparatedDecimal(fieldSet.readString(3)))
                .currency(fieldSet.readString(4));

        if(fieldSet.getFieldCount() == 7){
            return builder
                    .details(fieldSet.readString(5))
                    .accountNumber(fieldSet.readString(6))
                    .build();
        }
        else if (fieldSet.getFieldCount() == 8){
            return builder
                    .counterparty(fieldSet.readString(5))
                    .details(fieldSet.readString(6))
                    .accountNumber(fieldSet.readString(7))
                    .build();
        }
        else {
            throw new RuntimeException("Record version not implemented : there should be 7 or 8 columns");
        }
    }

}