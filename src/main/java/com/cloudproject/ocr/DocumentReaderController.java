package com.cloudproject.ocr;

import com.cloudproject.ocr.model.OCRResponseModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class DocumentReaderController {

    @Autowired
    private DocumentReaderService documentReaderService;

    @GetMapping("/image/details")
    public OCRResponseModel getImageDetails() {


        return documentReaderService.getDetailsFromImage();


    }

}