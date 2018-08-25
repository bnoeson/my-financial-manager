package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionFileEntity;
import be.noeson.myfinancialmanager.commons.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class TransactionFileService {

    @Autowired
    private TransactionFileRepository transactionFileRepository;

    public List<TransactionFileEntity> findAll() {
        return transactionFileRepository.findAll();
    }

    public TransactionFileEntity findById(Long transactionFileId) {
        return transactionFileRepository
                .findById(transactionFileId)
                .orElseThrow(() -> new ResourceNotFoundException("TransactionFile", "id", transactionFileId));
    }

    public void saveFile(MultipartFile file) throws IOException {
        this.transactionFileRepository.save(
            new TransactionFileEntity.Builder()
                .file(file.getBytes())
                .name(file.getOriginalFilename())
                .size(file.getSize())
                .build()
        );
    }

    public void saveFile(TransactionFileEntity transactionFile) {
        this.transactionFileRepository.save(transactionFile);
    }

    public void markTransactionFileAsProcessing(Long transactionFileId){
        TransactionFileEntity file = this.findById(transactionFileId);
        file.markAsProcessing();
        this.saveFile(file);
    }

}
