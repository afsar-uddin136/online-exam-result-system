package com.example.exam_result_system.service;

import com.example.exam_result_system.entity.Exam;
import com.example.exam_result_system.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {
    @Autowired
    private ExamRepository examRepository;

    public Exam createExam(Exam exam){
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams(){
        return examRepository.findAll();
    }

    public Exam publishExam(Long id){
        Exam exam = examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found with Id: " + id));
        exam.setPublishStatus("PUBLISHED");
        return examRepository.save(exam);
    }
}
