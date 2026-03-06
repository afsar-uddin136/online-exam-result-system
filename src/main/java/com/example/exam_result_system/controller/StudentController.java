package com.example.exam_result_system.controller;

import com.example.exam_result_system.entity.Student;
import com.example.exam_result_system.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<?> addStudent(@RequestBody Student student){
        Student savedStudent = studentService.addStudent(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllStudents(){
        List<Student> allStudents = studentService.getAllStudents();
        if(allStudents != null && !allStudents.isEmpty()){
            return new ResponseEntity<>(allStudents,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getStudentsByClass(@RequestParam Long classId){
        List<Student> studentsByClass = studentService.getStudentsByClass(classId);
        return new ResponseEntity<>(studentsByClass,HttpStatus.OK);
    }

}
