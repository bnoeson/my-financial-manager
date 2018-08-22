package be.noeson.myfinancialmanager.banking.boundary;

import be.noeson.myfinancialmanager.banking.control.TransactionFileService;
import be.noeson.myfinancialmanager.banking.control.TransactionFileImportBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class TransactionFileImportBatchRestController {

    @Autowired
    private TransactionFileImportBatchService transactionFileImportBatchService;

    @Autowired
    private TransactionFileService transactionFileService;

    @PostMapping(value = "/transactions/files/import")
    public ResponseEntity<String> startBatchForId(@RequestBody() Long transactionFileId) {
        try{
            this.transactionFileImportBatchService.startBatchForId(transactionFileId);
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
        this.transactionFileService.markTransactionFileAsProcessing(transactionFileId);
        return ResponseEntity.ok().body("Job successfully requested.");
    }

}
