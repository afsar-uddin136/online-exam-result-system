package com.example.exam_result_system.service;

import com.example.exam_result_system.entity.ResultSummary;
import com.example.exam_result_system.entity.Student;
import com.example.exam_result_system.repository.ResultSummaryRepository;
import com.example.exam_result_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultService {
    @Autowired
    private ResultSummaryRepository resultRepo;

    @Autowired
    private StudentRepository studentRepository;

    public ResultSummary addResult(ResultSummary result){
        return resultRepo.save(result);
    }

    public ResultSummary searchResult(Long examId,String roll){
        Student student = studentRepository.findByRoll(roll).orElseThrow(() -> new RuntimeException("No Student found with roll: " + roll));

        ResultSummary result = resultRepo.findByExamExamIdAndStudentStudentId(examId, student.getStudentId()).orElseThrow(() -> new RuntimeException("Result no found for this exam"));
        if(!result.getExam().getPublishStatus().equals("PUBLISHED")){
            throw new RuntimeException("Result not published yet");
        }
        return result;
    }
}
