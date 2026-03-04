package com.example.exam_result_system.controller;

import com.example.exam_result_system.entity.ResultSummary;
import com.example.exam_result_system.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/results")
@CrossOrigin("*")
public class ResultController {
    @Autowired
    private ResultService resultService;

    @PostMapping("/add")
    public ResponseEntity<?> addResult(@RequestBody ResultSummary result){
        try{
            ResultSummary savedResult = resultService.addResult(result);
            return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>("Error: Duplicate entry or invalid date",HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchResult(@RequestParam Long examId,@RequestParam String roll){
        try{

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        ResultSummary result = resultService.searchResult(examId, roll);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
