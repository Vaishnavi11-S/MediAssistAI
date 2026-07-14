package com.mediassist.controller;

import com.mediassist.model.User;
import com.mediassist.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            Map<String, Object> response = authService.login(
                    loginRequest.get("email"),
                    loginRequest.get("password")
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            Map<String, Object> response = authService.register(user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        User user = authService.getCurrentUser();
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
    }
}
