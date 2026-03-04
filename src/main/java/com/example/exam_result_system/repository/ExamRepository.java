package com.example.exam_result_system.repository;

import com.example.exam_result_system.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam,Long> {
}
