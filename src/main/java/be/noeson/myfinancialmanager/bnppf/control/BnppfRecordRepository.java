package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BnppfRecordRepository extends JpaRepository<BnppfRecordEntity, Long> {
    List<BnppfRecordEntity> findBySequenceNumberAndAccountNumber(String sequenceNumber, String accountNumber);
}