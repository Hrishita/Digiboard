package com.cloudproject.awshandler;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.cloudproject.ocr.model.OCRResponseModel;
import com.cloudproject.utility.UtilConstant;

import java.util.HashMap;

public class DynamoDbHandler {

    public static void insertObject(String username, OCRResponseModel model) {
        HashMap<String, AttributeValue> item_values =
                new HashMap<String, AttributeValue>();

        item_values.put("username", new AttributeValue(username));
        item_values.put("date_of_birth", new AttributeValue(model.getData().getDate_of_birth()));
        item_values.put("given_name", new AttributeValue(model.getData().getGiven_name()));
        item_values.put("sex", new AttributeValue(model.getData().getSex()));
        item_values.put("surname", new AttributeValue(model.getData().getSurname()));
        item_values.put("passport_number", new AttributeValue(model.getData().getPassport_number()));
        item_values.put("date_of_expiry", new AttributeValue(model.getData().getDate_of_expiry()));
        item_values.put("date_of_issue", new AttributeValue(model.getData().getDate_of_issue()));
        item_values.put("place_of_issue", new AttributeValue(model.getData().getPlace_of_issue()));
        item_values.put("place_of_birth", new AttributeValue(model.getData().getPlace_of_birth()));
        item_values.put("valid_dob", new AttributeValue(model.getIntegrity_checks().getValid_dob().toString()));
        item_values.put("valid_expiry_date", new AttributeValue(model.getIntegrity_checks().getValid_expiry_date().toString()));
        item_values.put("valid_issue_date", new AttributeValue(model.getIntegrity_checks().getValid_issue_date().toString()));
        item_values.put("valid_passport_number", new AttributeValue(model.getIntegrity_checks().getValid_passport_number().toString()));

        final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient();

        try {
            ddb.putItem(UtilConstant.TABLE_NAME, item_values);
        } catch (ResourceNotFoundException e) {
            System.err.format("Error: The table \"%s\" can't be found.\n", UtilConstant.TABLE_NAME);
            System.err.println("Be sure that it exists and that you've typed its name correctly!");
            System.exit(1);
        } catch (AmazonServiceException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }
}
