package com.mediassist.repository;

import com.mediassist.model.HealthMetric;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthMetricRepository extends MongoRepository<HealthMetric, String> {
    List<HealthMetric> findByUserIdOrderByRecordedAtDesc(String userId);
    List<HealthMetric> findByUserIdAndTypeOrderByRecordedAtDesc(String userId, String type);
}
