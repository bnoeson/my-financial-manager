DROP TABLE IF EXISTS BNPPF_RECORD;

CREATE TABLE BNPPF_RECORD (
    ID BIGINT auto_increment NOT NULL PRIMARY KEY,
    SEQUENCE_NR VARCHAR(30),
    EXECUTION_DT DATE(),
    VALUE_DT DATE(),
    AMOUNT DOUBLE(14,2),
    CURRENCY VARCHAR(30),
    DETAILS VARCHAR(255),
    ACCOUNT_NR VARCHAR(30)
);