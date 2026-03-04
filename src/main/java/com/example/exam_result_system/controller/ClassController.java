package com.example.exam_result_system.controller;

import com.example.exam_result_system.entity.ClassEntity;
import com.example.exam_result_system.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classes")
@CrossOrigin("*")
public class ClassController {
    @Autowired
    private ClassService classService;

    @GetMapping
    public ResponseEntity<?> getAllClasses(){
        List<ClassEntity> allClasses = classService.getAllClasses();
        return new ResponseEntity<>(allClasses, HttpStatus.OK);
    }
}
