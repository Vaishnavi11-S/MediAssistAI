package com.mediassist.repository;

import com.mediassist.model.Assessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends MongoRepository<Assessment, String> {
    List<Assessment> findByUserId(String userId);
}
