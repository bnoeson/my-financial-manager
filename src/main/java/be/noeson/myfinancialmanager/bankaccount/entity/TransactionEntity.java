package be.noeson.myfinancialmanager.bankaccount.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import org.apache.commons.lang3.Validate;
import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Created by boris.noeson on 11/05/2018.
 */
@Entity
@Table(name = "TRANSACTION")
public class TransactionEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SEQUENCE_NR")
    private String sequenceNumber;

    @Column(name = "EXECUTION_DT")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate executionDate;

    @Column(name = "VALUE_DT")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate valueDate;

    @Column(name = "ACCOUNT_NR")
    private String accountNumber;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Column(name = "CURRENCY")
    private String currency; // TODO enum

    @Column(name = "COUNTERPARTY")
    private String counterparty;

    @Column(name = "DETAILS", length = 500)
    private String details;

    // default constructor
    public TransactionEntity() {
    }

    private TransactionEntity(Builder builder) {
        this.setSequenceNumber(builder.sequenceNumber);
        this.setExecutionDate(builder.executionDate);
        this.setValueDate(builder.valueDate);
        this.setAccountNumber(builder.accountNumber);
        this.setAmount(builder.amount);
        this.setCurrency(builder.currency);
        this.setCounterparty(builder.counterparty);
        this.setDetails(builder.details);
    }

    public static class Builder {
        private String sequenceNumber;
        private LocalDate executionDate;
        private LocalDate valueDate;
        private String accountNumber;
        private BigDecimal amount;
        private String currency;
        private String counterparty;
        private String details;

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

        public Builder accountNumber(String accountNumber){
            this.accountNumber = accountNumber;
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

        public Builder counterparty(String counterparty){
            this.counterparty = counterparty;
            return this;
        }

        public Builder details(String details){
            this.details = details;
            return this;
        }

        public TransactionEntity build(){
            return new TransactionEntity(this);
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

    private void setSequenceNumber(String sequenceNumber) {
        this.sequenceNumber = Validate.notEmpty(sequenceNumber);
    }

    public LocalDate getExecutionDate() {
        return executionDate;
    }

    private void setExecutionDate(LocalDate executionDate) {
        this.executionDate = Validate.notNull(executionDate);
    }

    public LocalDate getValueDate() {
        return valueDate;
    }

    private void setValueDate(LocalDate valueDate) {
        this.valueDate = Validate.notNull(valueDate);
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    private void setAccountNumber(String accountNumber) {
        this.accountNumber = Validate.notEmpty(accountNumber);
    }

    public BigDecimal getAmount() {
        return amount;
    }

    private void setAmount(BigDecimal amount) {
        this.amount = Validate.notNull(amount);
    }

    public String getCurrency() {
        return currency;
    }

    private void setCurrency(String currency) {
        this.currency = Validate.notEmpty(currency);
    }

    public String getCounterparty() {
        return counterparty;
    }

    private void setCounterparty(String counterparty) {
        this.counterparty = counterparty;
    }

    public String getDetails() {
        return details;
    }

    private void setDetails(String details) {
        this.details = Validate.notEmpty(details);
    }
}
