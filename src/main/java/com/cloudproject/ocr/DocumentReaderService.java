package com.cloudproject.ocr;

import com.amazonaws.services.textract.AmazonTextract;
import com.amazonaws.services.textract.AmazonTextractClientBuilder;
import com.amazonaws.services.textract.model.*;
import com.cloudproject.ocr.model.OCRResponseModel;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;

@Service
public class DocumentReaderService {

    @Autowired
    private OCRResponseModel ocrResponseModel;

    public OCRResponseModel getDetailsFromImage()
    {
        String document = "input_best.jpg";

        ByteBuffer imageBytes = null;
        try (InputStream inputStream = new FileInputStream(new File(document))) {
            imageBytes = ByteBuffer.wrap(IOUtils.toByteArray(inputStream));
        } catch (IOException e) {
            e.printStackTrace();
        }
        AmazonTextract client = AmazonTextractClientBuilder.defaultClient();

//        DetectDocumentTextRequest request = new DetectDocumentTextRequest()
//                .withDocument(new Document()
//                        .withBytes(imageBytes));


//        DetectDocumentTextResult result = client.detectDocumentText(request);


        AnalyzeDocumentRequest request = new AnalyzeDocumentRequest().withFeatureTypes("FORMS").withDocument(new Document().withBytes(imageBytes));
        AnalyzeDocumentResult result = client.analyzeDocument(request);
        Block block = result.getBlocks().get(4);
        for(Block b : result.getBlocks()){
            System.out.println(b.getText());
        }
        ocrResponseModel.setStatus("success");
        return ocrResponseModel;
    }
}
