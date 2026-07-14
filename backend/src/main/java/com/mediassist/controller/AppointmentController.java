package com.mediassist.controller;

import com.mediassist.model.Appointment;
import com.mediassist.repository.AppointmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserAppointments(Authentication authentication) {
        String userId = authentication.getName();
        List<Appointment> appointments = appointmentRepository.findByUserId(userId);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment, Authentication authentication) {
        appointment.setUserId(authentication.getName());
        appointment.setStatus("PENDING");
        appointment.setCreatedAt(System.currentTimeMillis());
        appointment.setUpdatedAt(System.currentTimeMillis());
        
        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateAppointment(@PathVariable String id, @RequestBody Appointment appointment) {
        appointment.setId(id);
        appointment.setUpdatedAt(System.currentTimeMillis());
        
        Appointment updated = appointmentRepository.save(appointment);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteAppointment(@PathVariable String id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Appointment deleted"));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }
}
