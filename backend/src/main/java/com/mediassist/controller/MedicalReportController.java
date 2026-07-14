package com.mediassist.controller;

import com.mediassist.model.MedicalReport;
import com.mediassist.repository.MedicalReportRepository;
import com.mediassist.service.GeminiService;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medical-reports")
@CrossOrigin(origins = "*")
public class MedicalReportController {

    private final MedicalReportRepository medicalReportRepository;
    private final GeminiService geminiService;

    public MedicalReportController(MedicalReportRepository medicalReportRepository, GeminiService geminiService) {
        this.medicalReportRepository = medicalReportRepository;
        this.geminiService = geminiService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserReports(Authentication authentication) {
        String userId = authentication.getName();
        List<MedicalReport> reports = medicalReportRepository.findByUserId(userId);
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/upload")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadReport(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            MedicalReport report = new MedicalReport();
            report.setUserId(authentication.getName());
            report.setFileName(file.getOriginalFilename());
            report.setFileType(file.getContentType());
            report.setCreatedAt(System.currentTimeMillis());
            
            // In production, upload to cloud storage and get URL
            // For now, we'll just save the metadata
            MedicalReport saved = medicalReportRepository.save(report);
            
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to upload report"));
        }
    }

    @PostMapping("/summarize")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> summarizeReport(@RequestBody Map<String, String> request, Authentication authentication) {
        try {
            String reportText = request.get("reportText");
            System.out.println("User: " + authentication.getName());
            System.out.println("Received report text: " + reportText);
            String summary = geminiService.summarizeMedicalReport(reportText);
            System.out.println("Summary response: " + summary);
            
            // Parse the summary to return it as JSON object
            try {
                JSONObject summaryObj = new JSONObject(summary);
                return ResponseEntity.ok(Map.of("summary", summaryObj.toMap()));
            } catch (Exception parseException) {
                // If parsing fails, return as string
                return ResponseEntity.ok(Map.of("summary", summary));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to summarize report: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteReport(@PathVariable String id) {
        medicalReportRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Report deleted"));
    }
}
