package be.noeson.myfinancialmanager.banking.control;

import be.noeson.myfinancialmanager.banking.entity.TransactionFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionFileRepository extends JpaRepository<TransactionFileEntity, Long> {
}