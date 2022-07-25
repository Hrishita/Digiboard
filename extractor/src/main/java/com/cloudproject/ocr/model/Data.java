package com.cloudproject.ocr.model;

import org.springframework.stereotype.Service;

/**
 * keep the data of resulted ocr
 */

public class Data {
    private String given_name;
    private String sex;
    private String date_of_birth;
    private String surname;
    private String passport_number;
    private String date_of_expiry;
    private String date_of_issue;
    private String place_of_issue;
    private String place_of_birth;

    public String getPlace_of_birth() {
        return place_of_birth;
    }

    public void setPlace_of_birth(String place_of_birth) {
        this.place_of_birth = place_of_birth;
    }

    public String getGiven_name() {
        return given_name;
    }

    public void setGiven_name(String given_name) {
        this.given_name = given_name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPassport_number() {
        return passport_number;
    }

    public void setPassport_number(String passport_number) {
        this.passport_number = passport_number;
    }

    public String getDate_of_expiry() {
        return date_of_expiry;
    }

    public void setDate_of_expiry(String date_of_expiry) {
        this.date_of_expiry = date_of_expiry;
    }

    public String getDate_of_issue() {
        return date_of_issue;
    }

    public void setDate_of_issue(String date_of_issue) {
        this.date_of_issue = date_of_issue;
    }

    public String getPlace_of_issue() {
        return place_of_issue;
    }

    public void setPlace_of_issue(String place_of_issue) {
        this.place_of_issue = place_of_issue;
    }

    public void setDataField(String key, String value)
    {
        if(key.toLowerCase().contains("birth") && key.toLowerCase().contains("date"))
        {
            date_of_birth = value;
        }
        else if(key.toLowerCase().contains("birth"))
        {
            place_of_birth = value;
        }
        else if(key.toLowerCase().contains("given"))
        {
            given_name = value;
        }
        else if(key.toLowerCase().contains("surn"))
        {
            surname = value;
        }
        else if(key.toLowerCase().contains("expiry"))
        {
            date_of_expiry = value;
        }
        else if(key.toLowerCase().contains("place"))
        {
            place_of_issue = value;
        }
        else if(key.toLowerCase().contains("issue"))
        {
            date_of_issue = value;
        }
        else if(key.toLowerCase().contains("sex"))
        {
            sex = value;
        }
        else if(key.toLowerCase().contains("passport"))
        {
            passport_number = value;
        }
    }
}
