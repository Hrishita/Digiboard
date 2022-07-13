package com.cloudproject.awshandler;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.cloudproject.utility.UtilConstant;

import java.io.File;

public class SSShandler {


    /**
     *
     * @param file to upload
     * @return S3 public uri
     */
    public static String storeData(File file, String key_name) {
        key_name = UtilConstant.FOLDER_NAME + "/"+key_name;

        final AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();

        try{
            s3.putObject(UtilConstant.S3_BUCKET_NAME, key_name, file);
        }
        catch(AmazonServiceException e)
        {
            e.printStackTrace();
        }

        return "https://" + UtilConstant.S3_BUCKET_NAME +  ".s3.amazonaws.com/"+ UtilConstant.FOLDER_NAME +"/" + key_name;

    }
}
