package com.mediassist.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String prompt, List<Map<String, String>> history) {

       String systemPrompt = """
You are MediAssist AI, a healthcare assistant.

Analyze the user's symptoms and return ONLY valid JSON.
Do not add markdown or extra explanation.

JSON format:

{
  "possibleConditions": [
    "condition 1",
    "condition 2"
  ],
  "urgencyLevel": "Low/Medium/High/Emergency",
  "suggestedDepartment": "Department name",
  "selfCareTips": [
    "tip 1",
    "tip 2"
  ],
  "doctorRecommendation": "Recommendation message",
  "medicalDisclaimer": "This is educational information only."
}

Do not provide a final diagnosis.
Provide educational health guidance only.
""";

        String finalPrompt = systemPrompt + "\n\nUser Symptoms:\n" + prompt;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = """
{
 "contents":[
   {
     "parts":[
       {
         "text": "%s"
       }
     ]
   }
 ]
}
""".formatted(finalPrompt.replace("\"", "\\\""));

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        String url = apiUrl + "?key=" + apiKey;

        try {
            ResponseEntity<String> response =
                    restTemplate.exchange(url,
                            HttpMethod.POST,
                            entity,
                            String.class);

            return response.getBody();

        } catch (Exception e) {
            // Return fallback JSON for symptom analysis
            return """
{
  "possibleConditions": ["Unable to analyze - AI service unavailable"],
  "urgencyLevel": "Unknown",
  "suggestedDepartment": "General Physician",
  "selfCareTips": ["Please try again later", "Consult a doctor if symptoms persist"],
  "doctorRecommendation": "AI service temporarily unavailable. Please consult a healthcare provider.",
  "medicalDisclaimer": "This is educational information only."
}
""";
        }
    }

    public String analyzeSymptoms(String symptoms) {
        return generateResponse(symptoms, List.of());
    }

    public String summarizeMedicalReport(String reportText) {
        String prompt = "You are MediAssist AI, a healthcare assistant.\n\n" +
                "Analyze the following medical report and return ONLY valid JSON.\n\n" +
                "Rules:\n" +
                "- No markdown\n" +
                "- No ```json\n" +
                "- No extra explanation\n" +
                "- Return only valid JSON\n" +
                "- Never return plain paragraphs\n" +
                "- Keep the language simple for patients\n\n" +
                "JSON format:\n" +
                "{\n" +
                "  \"summary\": \"Simple explanation of the report\",\n" +
                "  \"keyFindings\": [\n" +
                "    \"...\",\n" +
                "    \"...\"\n" +
                "  ],\n" +
                "  \"abnormalValues\": [\n" +
                "    \"...\",\n" +
                "    \"...\"\n" +
                "  ],\n" +
                "  \"recommendations\": [\n" +
                "    \"...\",\n" +
                "    \"...\"\n" +
                "  ],\n" +
                "  \"doctorAdvice\": \"...\",\n" +
                "  \"disclaimer\": \"This is educational information only.\"\n" +
                "}\n\n" +
                "Medical Report:\n" + reportText;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = """
{
 "contents":[
   {
     "parts":[
       {
         "text": "%s"
       }
     ]
   }
 ]
}
""".formatted(prompt.replace("\"", "\\\""));

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        String url = apiUrl + "?key=" + apiKey;

        try {
            ResponseEntity<String> response =
                    restTemplate.exchange(url,
                            HttpMethod.POST,
                            entity,
                            String.class);

            return response.getBody();

        } catch (Exception e) {
            // Return fallback JSON for medical report summarization
            return """
{
  "summary": "Unable to generate AI summary because the AI service is temporarily unavailable.",
  "keyFindings": [],
  "abnormalValues": [],
  "recommendations": [],
  "doctorAdvice": "Please try again later or consult your doctor.",
  "disclaimer": "This is educational information only."
}
""";
        }
    }
}