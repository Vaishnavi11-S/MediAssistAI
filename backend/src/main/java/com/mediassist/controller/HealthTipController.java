package com.mediassist.controller;

import com.mediassist.model.HealthTip;
import com.mediassist.repository.HealthTipRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-tips")
@CrossOrigin(origins = "*")
public class HealthTipController {

    private final HealthTipRepository healthTipRepository;

    public HealthTipController(HealthTipRepository healthTipRepository) {
        this.healthTipRepository = healthTipRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllHealthTips() {
        List<HealthTip> tips = healthTipRepository.findAll();
        return ResponseEntity.ok(tips);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getTipsByCategory(@PathVariable String category) {
        List<HealthTip> tips = healthTipRepository.findByCategory(category);
        return ResponseEntity.ok(tips);
    }

    @GetMapping("/daily")
    public ResponseEntity<?> getDailyTip() {
        // Return a tip based on the day of the week
        List<HealthTip> tips = healthTipRepository.findAll();
        if (!tips.isEmpty()) {
            int dayOfWeek = (int) (System.currentTimeMillis() / (1000 * 60 * 60 * 24)) % tips.size();
            return ResponseEntity.ok(tips.get(dayOfWeek));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createHealthTip(@RequestBody HealthTip tip) {
        tip.setCreatedAt(System.currentTimeMillis());
        HealthTip saved = healthTipRepository.save(tip);
        return ResponseEntity.ok(saved);
    }
}
