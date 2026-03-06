package com.example.exam_result_system.repository;

import com.example.exam_result_system.entity.ResultSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResultSummaryRepository extends JpaRepository<ResultSummary,Long> {
    Optional<ResultSummary> findByExamExamNameAndExamYearAndStudentRoll(String examName, int year, String roll);
}
