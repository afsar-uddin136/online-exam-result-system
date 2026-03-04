package com.example.exam_result_system.controller;

import com.example.exam_result_system.entity.Exam;
import com.example.exam_result_system.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ResourceBundle;

@RestController
@RequestMapping("/exams")
@CrossOrigin("*")
public class ExamController {
    @Autowired
    private ExamService examService;

    @PostMapping("/create")
    public ResponseEntity<?> createExam(@RequestBody Exam exam){
        try{
            Exam savedExam = examService.createExam(exam);
            return new ResponseEntity<>(savedExam, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating exam: "+e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllExams(){
        List<Exam> allExams = examService.getAllExams();
        if(allExams.isEmpty()){
            return new ResponseEntity<>("No exams found",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(allExams,HttpStatus.OK);
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<?> publishExam(@PathVariable Long id){
        try {
            Exam publishedExam = examService.publishExam(id);
            return new ResponseEntity<>(publishedExam,HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }

    }
}
