package com.example.exam_result_system.service;

import com.example.exam_result_system.entity.ClassEntity;
import com.example.exam_result_system.repository.ClassRepository;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {
    @Autowired
    private ClassRepository classRepository;

    public List<ClassEntity> getAllClasses(){
        return classRepository.findAll();
    }
}
