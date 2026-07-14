package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "medicalReports")
public class MedicalReport {
    
    @Id
    private String id;
    private String userId;
    private String fileName;
    private String fileType;
    private String fileUrl;
    private String summary;
    private String mainFindings;
    private String diagnosisSummary;
    private List<String> medicines;
    private List<String> labResults;
    private String doctorAdvice;
    private long createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getMainFindings() { return mainFindings; }
    public void setMainFindings(String mainFindings) { this.mainFindings = mainFindings; }
    public String getDiagnosisSummary() { return diagnosisSummary; }
    public void setDiagnosisSummary(String diagnosisSummary) { this.diagnosisSummary = diagnosisSummary; }
    public List<String> getMedicines() { return medicines; }
    public void setMedicines(List<String> medicines) { this.medicines = medicines; }
    public List<String> getLabResults() { return labResults; }
    public void setLabResults(List<String> labResults) { this.labResults = labResults; }
    public String getDoctorAdvice() { return doctorAdvice; }
    public void setDoctorAdvice(String doctorAdvice) { this.doctorAdvice = doctorAdvice; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
}
