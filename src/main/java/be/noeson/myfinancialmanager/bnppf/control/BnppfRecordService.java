package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import be.noeson.myfinancialmanager.commons.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BnppfRecordService {

    @Autowired
    private BnppfRecordRepository bnppfRecordRepository;

    public List<BnppfRecordEntity> findAll() {
        return bnppfRecordRepository.findAll();
    }

    public BnppfRecordEntity findById(Long recordId) {
        return bnppfRecordRepository
                .findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("BnppfRecord", "id", recordId));
    }
}
