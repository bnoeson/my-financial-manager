package be.noeson.myfinancialmanager.bankaccount.boundary;

import be.noeson.myfinancialmanager.bankaccount.control.TransactionFileService;
import be.noeson.myfinancialmanager.bankaccount.control.TransactionFileImportBatchService;
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
