package com.cloudproject.ocr.model;

import com.cloudproject.ocr.checks.DataIntegrityChecks;
import com.fasterxml.jackson.annotation.JsonProperty;

public class OCRResponseModel {

    @JsonProperty("status")
    private String status;

    @JsonProperty("message")
    private String message;

    @JsonProperty("data")
    private Data data;

    @JsonProperty("integrity_checks")
    private DataIntegrityChecks integrity_checks;

    public DataIntegrityChecks getIntegrity_checks() {
        return integrity_checks;
    }

    public void setIntegrity_checks(DataIntegrityChecks integrity_checks) {
        this.integrity_checks = integrity_checks;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
