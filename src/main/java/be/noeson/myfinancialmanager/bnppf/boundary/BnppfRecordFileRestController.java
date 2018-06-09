package be.noeson.myfinancialmanager.bnppf.boundary;

import be.noeson.myfinancialmanager.bnppf.control.BnppfRecordFileService;
import be.noeson.myfinancialmanager.bnppf.entity.BnppfRecordFileEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
public class BnppfRecordFileRestController {

    @Autowired
    private BnppfRecordFileService bnppfRecordFileService;

    @PostMapping("/bnppf-records/files")
    public ResponseEntity<String> postBnppfRecordFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            this.bnppfRecordFileService.saveFile(file);
            message = "You successfully uploaded " + file.getOriginalFilename() + ".";
            return ResponseEntity.ok().body(message);
        } catch (Exception e) {
            message = "Failed to upload " + file.getOriginalFilename() + ".";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @GetMapping(value = "/bnppf-records/files")
    public ResponseEntity<List<BnppfRecordFileEntity>> getAllBnppfRecords() {
        return ResponseEntity.ok().body(bnppfRecordFileService.findAll());
    }

}
