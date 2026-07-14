package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "healthMetrics")
public class HealthMetric {
    
    @Id
    private String id;
    private String userId;
    private String type; // WEIGHT, BLOOD_PRESSURE, HEART_RATE, BLOOD_SUGAR, TEMPERATURE
    private double value;
    private String unit; // kg, mmHg, bpm, mg/dL, °C
    private String notes;
    private long recordedAt;
    private long createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public long getRecordedAt() { return recordedAt; }
    public void setRecordedAt(long recordedAt) { this.recordedAt = recordedAt; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
}
