package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "hospitals")
public class Hospital {
    
    @Id
    private String id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private double rating;
    private String distance;
    private boolean isOpen;
    private List<String> specialties;
    private double latitude;
    private double longitude;
    private String status;
    private long createdAt;
    private long updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }
    public boolean isOpen() { return isOpen; }
    public void setOpen(boolean open) { isOpen = open; }
    public List<String> getSpecialties() { return specialties; }
    public void setSpecialties(List<String> specialties) { this.specialties = specialties; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    public long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(long updatedAt) { this.updatedAt = updatedAt; }
}
