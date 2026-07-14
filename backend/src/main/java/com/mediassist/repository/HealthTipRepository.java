package com.mediassist.repository;

import com.mediassist.model.HealthTip;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthTipRepository extends MongoRepository<HealthTip, String> {
    List<HealthTip> findByCategory(String category);
}
