package com.mediassist.controller;

import com.mediassist.model.HealthMetric;
import com.mediassist.repository.HealthMetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-metrics")
@CrossOrigin(origins = "*")
public class HealthMetricController {

    @Autowired
    private HealthMetricRepository healthMetricRepository;

    @GetMapping
    public ResponseEntity<List<HealthMetric>> getUserHealthMetrics(@AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(healthMetricRepository.findByUserIdOrderByRecordedAtDesc(userId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<HealthMetric>> getHealthMetricsByType(
            @PathVariable String type,
            @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(healthMetricRepository.findByUserIdAndTypeOrderByRecordedAtDesc(userId, type));
    }

    @PostMapping
    public ResponseEntity<HealthMetric> createHealthMetric(
            @RequestBody HealthMetric healthMetric,
            @AuthenticationPrincipal String userId) {
        healthMetric.setUserId(userId);
        healthMetric.setCreatedAt(System.currentTimeMillis());
        if (healthMetric.getRecordedAt() == 0) {
            healthMetric.setRecordedAt(System.currentTimeMillis());
        }
        return ResponseEntity.ok(healthMetricRepository.save(healthMetric));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthMetric(@PathVariable String id) {
        healthMetricRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
