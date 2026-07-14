package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "appointments")
public class Appointment {
    
    @Id
    private String id;
    private String userId;
    private String userName;
    private String doctorName;
    private String hospitalName;
    private String specialty;
    private String date;
    private String time;
    private String status;
    private String notes;
    private long createdAt;
    private long updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    public long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(long updatedAt) { this.updatedAt = updatedAt; }
}
