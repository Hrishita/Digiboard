package com.cloudproject.ocr.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Service;

@Service
public class OCRResponseModel {
    public OCRResponseModel() {}

    public OCRResponseModel(String status) {
        this.status = status;
    }

    @JsonProperty("status")
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
