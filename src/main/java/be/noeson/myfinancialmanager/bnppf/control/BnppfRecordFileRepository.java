package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BnppfRecordFileRepository extends JpaRepository<BnppfRecordFileEntity, Long> {
}