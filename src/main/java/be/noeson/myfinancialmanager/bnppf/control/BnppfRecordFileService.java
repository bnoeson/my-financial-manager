package be.noeson.myfinancialmanager.bnppf.control;

import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordFileEntity;
import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordFileStatus;
import be.noeson.myfinancialmanager.commons.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BnppfRecordFileService {

    @Autowired
    private BnppfRecordFileRepository bnppfRecordFileRepository;

    public List<BnppfRecordFileEntity> findAll() {
        return bnppfRecordFileRepository.findAll();
    }

    public BnppfRecordFileEntity findById(Long recordFileId) {
        return bnppfRecordFileRepository
                .findById(recordFileId)
                .orElseThrow(() -> new ResourceNotFoundException("BnppfRecordFile", "id", recordFileId));
    }

    public void saveFile(MultipartFile file) throws IOException {
        this.bnppfRecordFileRepository.save(
            new BnppfRecordFileEntity.Builder()
                .file(file.getBytes())
                .name(file.getOriginalFilename())
                .size(file.getSize())
                .build()
        );
    }

    public void saveFile(BnppfRecordFileEntity recordFile) {
        this.bnppfRecordFileRepository.save(recordFile);
    }

    public void markRecordFileAsProcessing(Long recordFileId){
        BnppfRecordFileEntity file = this.findById(recordFileId);
        file.markAsProcessing();
        this.saveFile(file);
    }

}
