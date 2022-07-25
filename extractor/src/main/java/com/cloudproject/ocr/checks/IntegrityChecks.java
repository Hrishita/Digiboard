package com.cloudproject.ocr.checks;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class IntegrityChecks {

    public static  Boolean check_dob(String dob)
    {
        try {
            Date date=new SimpleDateFormat("dd/MM/yyyy").parse(dob);
            Date currentDate = new SimpleDateFormat("dd/MM/yyyy").parse(new SimpleDateFormat("dd/MM/yyyy").format(new Date()));

            return date.compareTo(currentDate) < 0 ? true : false;

        } catch (ParseException e) {
            return false;   //Date format is not proper return error
        }
    }

    public static Boolean check_issue_date(String issueDate)
    {
        try {
            Date date=new SimpleDateFormat("dd/MM/yyyy").parse(issueDate);
            Date currentDate = new SimpleDateFormat("dd/MM/yyyy").parse(new SimpleDateFormat("dd/MM/yyyy").format(new Date()));

            return date.compareTo(currentDate) < 0 ? true : false;

        } catch (ParseException e) {
            return false;   //Date format is not proper return error
        }

    }

    public static Boolean check_expiry_date(String expiryDate)
    {
        try {
            Date date=new SimpleDateFormat("dd/MM/yyyy").parse(expiryDate);
            Date currentDate = new SimpleDateFormat("dd/MM/yyyy").parse(new SimpleDateFormat("dd/MM/yyyy").format(new Date()));

            return date.compareTo(currentDate) > 0 ? true : false;

        } catch (ParseException e) {
            return false;   //Date format is not proper return error
        }
    }

    public static Boolean check_passport_number(String passportNumber)
    {
        return passportNumber.matches("[A-Z]+[0-9]+");
    }
}
