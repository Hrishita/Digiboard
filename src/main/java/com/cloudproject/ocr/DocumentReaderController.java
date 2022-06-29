package com.cloudproject.ocr;

import com.cloudproject.ocr.model.OCRResponseModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
class DocumentReaderController {

    @Autowired
    private DocumentReaderService documentReaderService;

    @PostMapping("/image/details")
    public OCRResponseModel getImageDetails(@RequestParam("file") MultipartFile file) {


        return documentReaderService.getDetailsFromImage(file);


    }

}