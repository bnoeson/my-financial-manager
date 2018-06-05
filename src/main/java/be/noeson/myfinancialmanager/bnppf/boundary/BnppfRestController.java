package be.noeson.myfinancialmanager.bnppf.boundary;

import be.noeson.myfinancialmanager.bnppf.control.BnppfRecordRepository;
import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordEntity;
import be.noeson.myfinancialmanager.commons.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BnppfRestController {

    @Autowired
    private BnppfRecordRepository bnppfRecordRepository;

    @RequestMapping(value = "/bnppf-records", method = RequestMethod.GET)
    public List<BnppfRecordEntity> getAllBnppfRecords() {
        return bnppfRecordRepository.findAll();
    }

    @GetMapping("/bnppf-records/{id}")
    public BnppfRecordEntity getNoteById(@PathVariable(value = "id") Long recordId) {
        return bnppfRecordRepository.findById(recordId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", recordId));
    }

}