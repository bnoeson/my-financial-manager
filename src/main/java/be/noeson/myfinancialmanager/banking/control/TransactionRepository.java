package be.noeson.myfinancialmanager.banking.control;

import be.noeson.myfinancialmanager.banking.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    List<TransactionEntity> findBySequenceNumberAndAccountNumber(String sequenceNumber, String accountNumber);
}