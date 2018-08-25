package be.noeson.myfinancialmanager.bankaccount.boundary;

import be.noeson.myfinancialmanager.bankaccount.control.TransactionFileService;
import be.noeson.myfinancialmanager.bankaccount.entity.TransactionFileEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
public class TransactionFileRestController {

    @Autowired
    private TransactionFileService transactionFileService;

    @PostMapping("/transactions/files")
    public ResponseEntity<String> postTransactionFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            this.transactionFileService.saveFile(file);
            message = "You successfully uploaded " + file.getOriginalFilename() + ".";
            return ResponseEntity.ok().body(message);
        } catch (Exception e) {
            message = "Failed to upload " + file.getOriginalFilename() + ".";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @GetMapping(value = "/transactions/files")
    public ResponseEntity<List<TransactionFileEntity>> getAllTransactionFiles() {
        return ResponseEntity.ok().body(transactionFileService.findAll());
    }

}
