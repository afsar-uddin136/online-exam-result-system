package com.example.exam_result_system.repository;

import com.example.exam_result_system.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<ClassEntity,Long> {
}
