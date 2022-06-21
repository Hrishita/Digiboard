package ocr;

import com.amazonaws.services.textract.AmazonTextract;
import com.amazonaws.services.textract.AmazonTextractClientBuilder;
import com.amazonaws.services.textract.model.Block;
import com.amazonaws.services.textract.model.DetectDocumentTextRequest;
import com.amazonaws.services.textract.model.DetectDocumentTextResult;
import com.amazonaws.services.textract.model.Document;
import org.apache.commons.io.IOUtils;
import java.io.*;
import java.nio.ByteBuffer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class DocumentReaderController {

    @Autowired
    private DocumentReaderService documentReaderService;

    @GetMapping("/image/details")
    public static void main(String[] args) throws FileNotFoundException {
        String document = "input.jpg";

        ByteBuffer imageBytes = null;
        try (InputStream inputStream = new FileInputStream(new File(document))) {
            imageBytes = ByteBuffer.wrap(IOUtils.toByteArray(inputStream));
        } catch (IOException e) {
            e.printStackTrace();
        }
        AmazonTextract client = AmazonTextractClientBuilder.defaultClient();

        DetectDocumentTextRequest request = new DetectDocumentTextRequest()
                .withDocument(new Document()
                        .withBytes(imageBytes));


        DetectDocumentTextResult result = client.detectDocumentText(request);

        Block block = result.getBlocks().get(4);
        for(Block b : result.getBlocks()){
            System.out.println(b.getText());
        }


    }

}