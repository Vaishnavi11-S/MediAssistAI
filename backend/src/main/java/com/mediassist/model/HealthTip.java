package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "healthTips")
public class HealthTip {
    
    @Id
    private String id;
    private String category;
    private String title;
    private String description;
    private String icon;
    private String color;
    private long createdAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
}
