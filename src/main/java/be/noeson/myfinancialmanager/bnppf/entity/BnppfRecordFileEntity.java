package be.noeson.myfinancialmanager.bnppf.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Created by boris.noeson on 11/05/2018.
 */
@Entity
@Table(name = "BNPPF_RECORD_FILE")
public class BnppfRecordFileEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @JsonIgnore
    @Column(name="FILE")
    private byte[] file;

    @Column(name="NAME")
    private String name;

    @Column(name = "UPLOAD_DT")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime uploadDateTime;

    @Column(name = "SIZE")
    private long size;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private BnppfRecordFileStatus status;

    // default constructor
    public BnppfRecordFileEntity() {
    }

    private BnppfRecordFileEntity(Builder builder) {
        this.setFile(builder.file);
        this.setUploadDateTime(builder.uploadDateTime);
        this.setName(builder.name);
        this.setSize(builder.size);
        this.setStatus(builder.status);
    }

    public static class Builder {
        private byte[] file;
        private LocalDateTime uploadDateTime = LocalDateTime.now();
        private String name;
        private long size;
        private BnppfRecordFileStatus status = BnppfRecordFileStatus.READY_TO_PROCESS;

        public Builder file(byte[] file){
            this.file = file;
            return this;
        }

        public Builder name(String name){
            this.name = name;
            return this;
        }

        public Builder uploadDateTime(LocalDateTime uploadDateTime){
            this.uploadDateTime = uploadDateTime;
            return this;
        }

        public Builder status(BnppfRecordFileStatus status){
            this.status = status;
            return this;
        }

        public Builder size(long size){
            this.size = size;
            return this;
        }

        public BnppfRecordFileEntity build(){
            return new BnppfRecordFileEntity(this);
        }

    }

    public Long getId() {
        return id;
    }

    private void setId(Long id) {
        this.id = id;
    }

    public byte[] getFile() {
        return file;
    }

    private void setFile(byte[] file) {
        this.file = file;
    }

    public String getName() {
        return name;
    }

    private void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getUploadDateTime() {
        return uploadDateTime;
    }

    private void setUploadDateTime(LocalDateTime uploadDateTime) {
        this.uploadDateTime = uploadDateTime;
    }

    public long getSize() {
        return size;
    }

    private void setSize(long size) {
        this.size = size;
    }

    public BnppfRecordFileStatus getStatus() {
        return status;
    }

    public Boolean hasStatus(){
        return this.status != null;
    }

    private void setStatus(BnppfRecordFileStatus status) {
        this.status = status;
    }

    public void markAsReadyToProcess(){
        this.setStatus(BnppfRecordFileStatus.READY_TO_PROCESS);
    }

    public void markAsProcessing(){
        this.setStatus(BnppfRecordFileStatus.PROCESSING);
    }

    public void markAsProcessFailed(){
        this.setStatus(BnppfRecordFileStatus.PROCESS_FAILED);
    }

    public void markAsProcessed(){
        this.setStatus(BnppfRecordFileStatus.PROCESSED);
    }

    @JsonIgnore
    public Boolean isReadyToProcess(){
        return this.hasStatus() && this.status.isReadyToProcess();
    }

    @JsonIgnore
    public Boolean isProcessing(){
        return this.hasStatus() && this.status.isProcessing();
    }

    @JsonIgnore
    public Boolean isProcessFailed(){
        return this.hasStatus() && this.status.isProcessFailed();
    }

    @JsonIgnore
    public Boolean isProcessed(){
        return this.hasStatus() && this.status.isProcessed();
    }

}
