package be.noeson.myfinancialmanager.bnppf.entity;

public enum BnppfRecordFileStatus {
    READY_TO_PROCESS,
    PROCESSING,
    PROCESS_FAILED,
    PROCESSED;

    public Boolean isReadyToProcess(){
        return this.equals(READY_TO_PROCESS);
    }

    public Boolean isProcessing(){
        return this.equals(PROCESSING);
    }

    public Boolean isProcessFailed(){
        return this.equals(PROCESS_FAILED);
    }

    public Boolean isProcessed(){
        return this.equals(PROCESSED);
    }
}
