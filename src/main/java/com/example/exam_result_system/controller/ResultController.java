package com.example.exam_result_system.controller;

import com.example.exam_result_system.entity.ResultSummary;
import com.example.exam_result_system.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> searchResult(@RequestParam String examName,@RequestParam int year,@RequestParam String roll,@RequestParam Long classId){
        try{
            ResultSummary result = resultService.searchResult(examName,year,roll,classId);
            return new ResponseEntity<>(result,HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/saveAllResult")
    public ResponseEntity<?> saveAllResults(@RequestBody List<ResultSummary> results) {

        if(results==null || results.isEmpty()){
            return new ResponseEntity<>("No results provided to save.",HttpStatus.BAD_REQUEST);
        }

        for(ResultSummary res: results){
            if(res.getStudent()==null || res.getStudent().getStudentId()==null){
                return new ResponseEntity<>("Invalid student data found.",HttpStatus.BAD_REQUEST);

            }
        }

        try {
            List<ResultSummary> savedResults = resultService.saveAllResults(results);
            return new ResponseEntity<>(savedResults, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
