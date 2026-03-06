package com.example.exam_result_system.service;

import com.example.exam_result_system.entity.ResultSummary;
import com.example.exam_result_system.repository.ResultSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultSummaryRepository resultRepo;


    public ResultSummary addResult(ResultSummary result){
        return resultRepo.save(result);
    }

    public ResultSummary searchResult(String examName, int year, String roll, Long classId){

        ResultSummary result = resultRepo.findByExamExamNameAndExamYearAndStudentRoll(examName,year,roll).orElseThrow(() -> new RuntimeException("Result no found for this exam"));

        if (!result.getStudent().getClassEntity().getClassId().equals(classId)) {
            throw new RuntimeException("Result not found for the selected class!");
        }

        if(!result.getExam().getPublishStatus().equals("PUBLISHED")){
            throw new RuntimeException("Result not published yet");
        }
        return result;
    }

    public List<ResultSummary> saveAllResults(List<ResultSummary> results) {
        for (ResultSummary res : results) {
            double marks = res.getTotalMarks();

            res.setPassFailStatus(marks >= 33.0 ? "PASS" : "FAIL");

            if (marks >= 80) { res.setFinalGrade("A+"); res.setGpa(5.0); }
            else if (marks >= 70) { res.setFinalGrade("A"); res.setGpa(4.0); }
            else if (marks >= 60) { res.setFinalGrade("A-"); res.setGpa(3.5); }
            else if (marks >= 33) { res.setFinalGrade("D"); res.setGpa(1.0); }
            else { res.setFinalGrade("F"); res.setGpa(0.0); }
        }
        return resultRepo.saveAll(results);
    }
}
