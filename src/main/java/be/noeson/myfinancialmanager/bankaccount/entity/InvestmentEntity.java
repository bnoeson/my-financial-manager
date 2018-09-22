package be.noeson.myfinancialmanager.bankaccount.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "INVESTMENT")
public class InvestmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @JsonIgnoreProperties("investment")
    @OneToMany(mappedBy = "investment")
    private List<TransactionEntity> transactions;

    // default constructor
    public InvestmentEntity() {
    }

    private InvestmentEntity(InvestmentEntity.Builder builder) {
        this.setName(builder.name);
    }

    public static class Builder {
        private String name;

        public InvestmentEntity.Builder name(String name){
            this.name = name;
            return this;
        }

        public InvestmentEntity build(){
            return new InvestmentEntity(this);
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TransactionEntity> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<TransactionEntity> transactions) {
        this.transactions = transactions;
    }
}
