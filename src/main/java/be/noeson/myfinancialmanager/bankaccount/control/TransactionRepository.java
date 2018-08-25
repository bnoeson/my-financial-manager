package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    List<TransactionEntity> findBySequenceNumberAndAccountNumber(String sequenceNumber, String accountNumber);
}