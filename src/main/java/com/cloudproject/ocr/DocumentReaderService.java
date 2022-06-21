package com.cloudproject.ocr;

import com.amazonaws.services.textract.AmazonTextract;
import com.amazonaws.services.textract.AmazonTextractClientBuilder;
import com.amazonaws.services.textract.model.*;
import com.cloudproject.ocr.model.Data;
import com.cloudproject.ocr.model.OCRResponseModel;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentReaderService {

    private OCRResponseModel ocrResponseModel;

    private Map<String , List> valueMap ;
    private Map wordMap;
    private Map kvMap;

    public DocumentReaderService(){//spring boot will use this constructor
        valueMap = new HashMap<String , List>();
        wordMap = new HashMap<String, String>();
        kvMap = new HashMap<String, String>();
    }

    public OCRResponseModel getDetailsFromImage(MultipartFile mpFile)
    {
        valueMap.clear();
        wordMap.clear();
        kvMap.clear();

        ocrResponseModel = new OCRResponseModel();

        File file = null;
        try {
            file = multipartToFile(mpFile,"dummyfilename.jpg");
        } catch (IOException e) {
            ocrResponseModel.setMessage(e.getLocalizedMessage());
            ocrResponseModel.setStatus("error");
            return ocrResponseModel;
        }


        ByteBuffer imageBytes = null;
        try (InputStream inputStream = new FileInputStream(file)) {
            imageBytes = ByteBuffer.wrap(IOUtils.toByteArray(inputStream));
        AmazonTextract client = AmazonTextractClientBuilder.defaultClient();

        AnalyzeDocumentRequest request = new AnalyzeDocumentRequest().withFeatureTypes("FORMS").withDocument(new Document().withBytes(imageBytes));
        AnalyzeDocumentResult result = client.analyzeDocument(request);

        getValueMap(result);

        getKVMap(result);

        for(Object key : kvMap.keySet())
        {
            System.out.println(key.toString() + " : " + kvMap.get(key));

        }

        if(kvMap.isEmpty()){
            ocrResponseModel.setStatus("failed");
            ocrResponseModel.setStatus("Cannot read any details from image. Please make sure image has information");
        }
        else {
            ocrResponseModel.setStatus("success");
            ocrResponseModel.setMessage("successful");
            Data data = new Data();

            for(Object key : kvMap.keySet())
            {
                String keyS = key.toString();
                data.setDataField(keyS, kvMap.get(keyS).toString());
            }
            ocrResponseModel.setData(data);

        }
    }
        catch (Exception e) {
        ocrResponseModel.setMessage(e.getLocalizedMessage());
        ocrResponseModel.setStatus("error");
        return ocrResponseModel;
    }

        return ocrResponseModel;
    }

    private void getKVMap(AnalyzeDocumentResult result)
    {
        for(Block b: result.getBlocks())
        {
            if("KEY_VALUE_SET".equals(b.getBlockType()) && b.getEntityTypes().contains("KEY"))
            {//is a Key field
                List<Relationship> relns = b.getRelationships();
                String key="";
                String value="";

                for(Relationship reln : relns)
                {
                    if(reln.getType().equals("CHILD"))
                    {
                        for(String id : reln.getIds())
                        {
                            key += wordMap.get(id) + " ";
                        }

                        if(key.length() > 1)
                        {
                            key = key.substring(0,key.length()-1);
                        }
                    }
                    else if(reln.getType().equals("VALUE"))
                    {
                        for(String id : reln.getIds())
                        {
                            List<String> valueIds = valueMap.get(id);
                            for(String valueId : valueIds) {

                                value += wordMap.get(valueId) + " ";
                            }

                            if(value.length() > 1)
                            {
                                value = value.substring(0,value.length()-1);
                            }
                        }
                    }
                }
                if(!key.isEmpty())
                {
                    kvMap.put(key, value);
                }
            }
            else if("WORD".equals(b.getBlockType()))
            {//is a word field
                wordMap.put(b.getId(),b.getText());
            }
        }
    }


    private void getValueMap(AnalyzeDocumentResult result)
    {
        for(Block b: result.getBlocks())
        {
            if("KEY_VALUE_SET".equals(b.getBlockType()) && b.getEntityTypes().contains("VALUE"))
            {//is a value field
                List<Relationship> relns = b.getRelationships();

                for(Relationship reln : relns)
                {
                    if(reln.getType().equals("CHILD"))
                    {
                        valueMap.put(b.getId(), reln.getIds());
                        break;
                    }
                }
            }
            else if("WORD".equals(b.getBlockType()))
            {//is a word field
                wordMap.put(b.getId(),b.getText());
            }
        }
    }


    private File multipartToFile(MultipartFile multipart, String fileName) throws IllegalStateException, IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+fileName);
        multipart.transferTo(convFile);
        return convFile;
    }
}
