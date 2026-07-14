package com.mediassist.controller;

import com.mediassist.model.Hospital;
import com.mediassist.repository.HospitalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "*")
public class HospitalController {

    private final HospitalRepository hospitalRepository;

    public HospitalController(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllHospitals() {
        List<Hospital> hospitals = hospitalRepository.findByStatus("ACTIVE");
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHospitalById(@PathVariable String id) {
        return hospitalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createHospital(@RequestBody Hospital hospital) {
        hospital.setStatus("ACTIVE");
        hospital.setCreatedAt(System.currentTimeMillis());
        hospital.setUpdatedAt(System.currentTimeMillis());
        
        Hospital saved = hospitalRepository.save(hospital);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateHospital(@PathVariable String id, @RequestBody Hospital hospital) {
        hospital.setId(id);
        hospital.setUpdatedAt(System.currentTimeMillis());
        
        Hospital updated = hospitalRepository.save(hospital);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteHospital(@PathVariable String id) {
        hospitalRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Hospital deleted"));
    }
}
