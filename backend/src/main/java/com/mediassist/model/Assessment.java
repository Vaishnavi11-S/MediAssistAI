package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "assessments")
public class Assessment {
    
    @Id
    private String id;
    private String userId;
    private String symptoms;
    private List<String> possibleConditions;
    private String urgencyLevel;
    private String suggestedDepartment;
    private List<String> selfCareTips;
    private String doctorRecommendation;
    private Map<String, Object> aiResponse;
    private long createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
    public List<String> getPossibleConditions() { return possibleConditions; }
    public void setPossibleConditions(List<String> possibleConditions) { this.possibleConditions = possibleConditions; }
    public String getUrgencyLevel() { return urgencyLevel; }
    public void setUrgencyLevel(String urgencyLevel) { this.urgencyLevel = urgencyLevel; }
    public String getSuggestedDepartment() { return suggestedDepartment; }
    public void setSuggestedDepartment(String suggestedDepartment) { this.suggestedDepartment = suggestedDepartment; }
    public List<String> getSelfCareTips() { return selfCareTips; }
    public void setSelfCareTips(List<String> selfCareTips) { this.selfCareTips = selfCareTips; }
    public String getDoctorRecommendation() { return doctorRecommendation; }
    public void setDoctorRecommendation(String doctorRecommendation) { this.doctorRecommendation = doctorRecommendation; }
    public Map<String, Object> getAiResponse() { return aiResponse; }
    public void setAiResponse(Map<String, Object> aiResponse) { this.aiResponse = aiResponse; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
}
