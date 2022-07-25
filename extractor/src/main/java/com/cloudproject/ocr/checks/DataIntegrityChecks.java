package com.cloudproject.ocr.checks;

public class DataIntegrityChecks {

    private Boolean valid_dob;
    private Boolean valid_expiry_date;
    private Boolean valid_issue_date;
    private Boolean valid_passport_number;

    public Boolean getValid_issue_date() {
        return valid_issue_date;
    }

    public void setValid_issue_date(Boolean valid_issue_date) {
        this.valid_issue_date = valid_issue_date;
    }

    public Boolean getValid_dob() {
        return valid_dob;
    }

    public void setValid_dob(Boolean valid_dob) {
        this.valid_dob = valid_dob;
    }

    public Boolean getValid_expiry_date() {
        return valid_expiry_date;
    }

    public void setValid_expiry_date(Boolean valid_expiry_date) {
        this.valid_expiry_date = valid_expiry_date;
    }

    public Boolean getValid_passport_number() {
        return valid_passport_number;
    }

    public void setValid_passport_number(Boolean valid_passport_number) {
        this.valid_passport_number = valid_passport_number;
    }
}
