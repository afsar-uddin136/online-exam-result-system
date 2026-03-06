package com.example.exam_result_system.repository;

import com.example.exam_result_system.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Long> {
    Optional<Student> findByRoll(String roll);
    List<Student> findByClassEntityClassId(Long classId);
}
