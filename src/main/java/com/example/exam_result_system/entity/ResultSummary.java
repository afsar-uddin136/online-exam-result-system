package com.example.exam_result_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "result_summaries",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"exam_id","student_id"})})
@Data
@NoArgsConstructor
public class ResultSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private Double totalMarks;
    private Double gpa;
    private String finalGrade;
    private String passFailStatus;

}
