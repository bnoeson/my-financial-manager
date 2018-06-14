package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import be.noeson.myfinancialmanager.commons.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.MessageFormat;
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

    public Boolean areDuplicateRecordsPresent(BnppfRecordEntity record){
        List<BnppfRecordEntity> files = this.bnppfRecordRepository.
                findBySequenceNumberAndAccountNumber(record.getSequenceNumber(), record.getAccountNumber());
        if( files.size() > 1 ){
            String message = MessageFormat.format(
                    "More than one record found for the following combination : sequenceNumber={0}, accountNumber={1}",
                    record.getSequenceNumber(), record.getAccountNumber() );
            throw new RuntimeException(message);
        }
        return ! CollectionUtils.isEmpty(files);
    }

}
