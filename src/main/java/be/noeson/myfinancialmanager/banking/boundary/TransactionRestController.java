package be.noeson.myfinancialmanager.banking.boundary;

import be.noeson.myfinancialmanager.banking.control.TransactionService;
import be.noeson.myfinancialmanager.banking.entity.TransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class TransactionRestController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping(value = "/transactions")
    public ResponseEntity<List<TransactionEntity>> getAllTransactions() {
        return ResponseEntity.ok().body(transactionService.findAll());
    }

    @GetMapping("/transactions/{id}")
    public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable(value = "id") Long transactionId) {
        return ResponseEntity.ok().body(transactionService.findById(transactionId));
    }

}