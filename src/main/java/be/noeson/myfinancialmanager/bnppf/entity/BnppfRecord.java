package be.noeson.myfinancialmanager.bnppf.entity;

import org.apache.commons.lang3.Validate;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Created by boris.noeson on 11/05/2018.
 */
public class BnppfRecord implements Serializable {

    private Long id;
    private String sequenceNumber;
    private LocalDate executionDate;
    private LocalDate valueDate;
    private BigDecimal amount;
    private String currency; // TODO enum
    private String counterPartyAccountNumber;
    private String details;
    private String acountNumber;

    // default constructor
    public BnppfRecord() {
    }

    private BnppfRecord(Builder builder) {
        this.setSequenceNumber(builder.sequenceNumber);
        this.setExecutionDate(builder.executionDate);
        this.setValueDate(builder.valueDate);
        this.setAmount(builder.amount);
        this.setCurrency(builder.currency);
        this.setCounterPartyAccountNumber(builder.counterPartyAccountNumber);
        this.setDetails(builder.details);
        this.setAcountNumber(builder.acountNumber);
    }

    public static class Builder {
        private String sequenceNumber;
        private LocalDate executionDate;
        private LocalDate valueDate;
        private BigDecimal amount;
        private String currency;
        private String counterPartyAccountNumber;
        private String details;
        private String acountNumber;

        public Builder sequenceNumber(String sequenceNumber){
            this.sequenceNumber = sequenceNumber;
            return this;
        }

        public Builder executionDate(LocalDate executionDate){
            this.executionDate = executionDate;
            return this;
        }

        public Builder valueDate(LocalDate valueDate){
            this.valueDate = valueDate;
            return this;
        }

        public Builder amount(BigDecimal amount){
            this.amount = amount;
            return this;
        }

        public Builder currency(String currency){
            this.currency = currency;
            return this;
        }

        public Builder counterPartyAccountNumber(String counterPartyAccountNumber){
            this.counterPartyAccountNumber = counterPartyAccountNumber;
            return this;
        }

        public Builder details(String details){
            this.details = details;
            return this;
        }

        public Builder acountNumber(String acountNumber){
            this.acountNumber = acountNumber;
            return this;
        }

        public BnppfRecord build(){
            return new BnppfRecord(this);
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(String sequenceNumber) {
        this.sequenceNumber = Validate.notEmpty(sequenceNumber);
    }

    public LocalDate getExecutionDate() {
        return executionDate;
    }

    public void setExecutionDate(LocalDate executionDate) {
        this.executionDate = Validate.notNull(executionDate);
    }

    public LocalDate getValueDate() {
        return valueDate;
    }

    public void setValueDate(LocalDate valueDate) {
        this.valueDate = Validate.notNull(valueDate);
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = Validate.notNull(amount);
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = Validate.notEmpty(currency);
    }

    public String getCounterPartyAccountNumber() {
        return counterPartyAccountNumber;
    }

    public void setCounterPartyAccountNumber(String counterPartyAccountNumber) {
        this.counterPartyAccountNumber = counterPartyAccountNumber;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = Validate.notEmpty(details);
    }

    public String getAcountNumber() {
        return acountNumber;
    }

    public void setAcountNumber(String acountNumber) {
        this.acountNumber = Validate.notEmpty(acountNumber);
    }
}
