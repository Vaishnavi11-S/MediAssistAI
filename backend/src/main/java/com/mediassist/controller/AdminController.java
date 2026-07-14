package com.mediassist.controller;

import com.mediassist.model.Appointment;
import com.mediassist.model.Feedback;
import com.mediassist.model.Hospital;
import com.mediassist.model.User;
import com.mediassist.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final HospitalRepository hospitalRepository;
    private final FeedbackRepository feedbackRepository;

    public AdminController(UserRepository userRepository, AppointmentRepository appointmentRepository, 
                          HospitalRepository hospitalRepository, FeedbackRepository feedbackRepository) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.hospitalRepository = hospitalRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalAppointments", appointmentRepository.count());
        stats.put("totalHospitals", hospitalRepository.count());
        stats.put("totalFeedback", feedbackRepository.count());
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable String id, @RequestBody Map<String, Boolean> request) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setActive(request.get("active"));
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted"));
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable String id, @RequestBody Map<String, String> request) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment != null) {
            appointment.setStatus(request.get("status"));
            appointmentRepository.save(appointment);
            return ResponseEntity.ok(appointment);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/hospitals")
    public ResponseEntity<?> getAllHospitals() {
        List<Hospital> hospitals = hospitalRepository.findAll();
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/feedback")
    public ResponseEntity<?> getAllFeedback() {
        List<Feedback> feedback = feedbackRepository.findAll();
        return ResponseEntity.ok(feedback);
    }

    @PutMapping("/feedback/{id}/status")
    public ResponseEntity<?> updateFeedbackStatus(@PathVariable String id, @RequestBody Map<String, String> request) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if (feedback != null) {
            feedback.setStatus(request.get("status"));
            feedbackRepository.save(feedback);
            return ResponseEntity.ok(feedback);
        }
        return ResponseEntity.notFound().build();
    }
}
