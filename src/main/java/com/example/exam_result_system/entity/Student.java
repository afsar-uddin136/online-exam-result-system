package com.example.exam_result_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(unique = true,nullable = false)
    private String roll;

    @Column(unique = true,nullable = false)
    private String regNo;

    private String fullName;
    private String session;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;
}
