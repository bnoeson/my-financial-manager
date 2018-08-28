package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    List<TransactionEntity> findBySequenceNumberAndAccountNumber(String sequenceNumber, String accountNumber);
    List<TransactionEntity> findByExecutionDateAndAmountAndIsInternalFalse(LocalDate executionDate, BigDecimal amount);
}