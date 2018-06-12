package be.noeson.myfinancialmanager.bnppf.boundary;

import be.noeson.myfinancialmanager.bnppf.control.BnppfRecordFileService;
import be.noeson.myfinancialmanager.bnppf.control.BnppfRecordImportBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
public class BnppfRecordImportBatchRestController {

    @Autowired
    private BnppfRecordImportBatchService bnppfRecordImportBatchService;

    @Autowired
    private BnppfRecordFileService bnppfRecordFileService;

    @PostMapping(value = "/bnppf-records/files/import")
    public ResponseEntity<String> startBatchForId(@RequestBody() Long recordFileId) {
        try{
            this.bnppfRecordImportBatchService.startBatchForId(recordFileId);
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
        this.bnppfRecordFileService.markRecordFileAsProcessing(recordFileId);
        return ResponseEntity.ok().body("Job successfully requested.");
    }

}
