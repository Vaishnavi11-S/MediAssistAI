package com.mediassist.service;

import com.mediassist.model.User;
import com.mediassist.repository.UserRepository;
import com.mediassist.security.JwtTokenProvider;
import com.mediassist.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public Map<String, Object> login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(email).orElse(null);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return response;
    }

    public Map<String, Object> register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        String rawPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole("USER");
        user.setActive(true);
        user.setCreatedAt(System.currentTimeMillis());
        user.setUpdatedAt(System.currentTimeMillis());

        User savedUser = userRepository.save(user);

        // Auto-login after registration by generating token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), rawPassword)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);

        return response;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            return userRepository.findById(userPrincipal.getId()).orElse(null);
        }
        return null;
    }
}
