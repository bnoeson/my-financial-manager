package be.noeson.myfinancialmanager.bnppf.boundary;

import be.noeson.myfinancialmanager.bnppf.control.BnppfRecordService;
import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class BnppfRecordRestController {

    @Autowired
    private BnppfRecordService bnppfRecordService;

    @GetMapping(value = "/bnppf-records")
    public ResponseEntity<List<BnppfRecordEntity>> getAllBnppfRecords() {
        return ResponseEntity.ok().body(bnppfRecordService.findAll());
    }

    @GetMapping("/bnppf-records/{id}")
    public ResponseEntity<BnppfRecordEntity> getBnppfRecordById(@PathVariable(value = "id") Long recordId) {
        return ResponseEntity.ok().body(bnppfRecordService.findById(recordId));
    }

}