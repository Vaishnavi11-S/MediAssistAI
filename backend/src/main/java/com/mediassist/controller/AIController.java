package com.mediassist.controller;

import com.mediassist.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final GeminiService geminiService;

    public AIController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> chat(@RequestBody Map<String, Object> request) {
        String message = (String) request.get("message");
        @SuppressWarnings("unchecked")
        List<Map<String, String>> history = (List<Map<String, String>>) request.get("history");

        String response = geminiService.generateResponse(message, history != null ? history : List.of());

        return ResponseEntity.ok(Map.of(
                "response", response,
                "timestamp", System.currentTimeMillis()
        ));
    }

    @PostMapping("/analyze-symptoms")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> analyzeSymptoms(@RequestBody Map<String, String> request) {
        String symptoms = request.get("symptoms");
        String analysis = geminiService.analyzeSymptoms(symptoms);

        return ResponseEntity.ok(Map.of(
                "analysis", analysis,
                "timestamp", System.currentTimeMillis()
        ));
    }

    @PostMapping("/summarize-report")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> summarizeReport(@RequestBody Map<String, String> request) {
        String reportText = request.get("reportText");
        String summary = geminiService.summarizeMedicalReport(reportText);

        return ResponseEntity.ok(Map.of(
                "summary", summary,
                "timestamp", System.currentTimeMillis()
        ));
    }
}
