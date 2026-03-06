package com.example.exam_result_system.service;

import com.example.exam_result_system.entity.Student;
import com.example.exam_result_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student){
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public List<Student> getStudentsByClass(Long classId){
       return studentRepository.findByClassEntityClassId(classId);
    }
}
