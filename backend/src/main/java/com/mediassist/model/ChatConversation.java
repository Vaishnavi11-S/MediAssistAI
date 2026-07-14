package com.mediassist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "chatConversations")
public class ChatConversation {
    
    @Id
    private String id;
    private String userId;
    private String title;
    private List<ChatMessage> messages;
    private long createdAt;
    private long updatedAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<ChatMessage> getMessages() { return messages; }
    public void setMessages(List<ChatMessage> messages) { this.messages = messages; }
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    public long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(long updatedAt) { this.updatedAt = updatedAt; }

    public static class ChatMessage {
        private String role;
        private String content;
        private String imageUrl;
        private String fileName;
        private long timestamp;

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public long getTimestamp() { return timestamp; }
        public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
    }
}
