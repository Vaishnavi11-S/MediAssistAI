package com.mediassist.repository;

import com.mediassist.model.MedicalReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalReportRepository extends MongoRepository<MedicalReport, String> {
    List<MedicalReport> findByUserId(String userId);
}
