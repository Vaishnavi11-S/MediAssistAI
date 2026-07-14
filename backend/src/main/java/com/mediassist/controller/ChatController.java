package com.mediassist.controller;

import com.mediassist.model.ChatConversation;
import com.mediassist.repository.ChatConversationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatConversationRepository chatConversationRepository;

    public ChatController(ChatConversationRepository chatConversationRepository) {
        this.chatConversationRepository = chatConversationRepository;
    }

@GetMapping
public ResponseEntity<?> getUserConversations() {
    List<ChatConversation> conversations = chatConversationRepository.findAll();
    return ResponseEntity.ok(conversations);
}
@PostMapping
public ResponseEntity<?> createConversation(
        @RequestBody ChatConversation conversation) {

    conversation.setUserId("guest");
    conversation.setCreatedAt(System.currentTimeMillis());
    conversation.setUpdatedAt(System.currentTimeMillis());
    
    ChatConversation saved = chatConversationRepository.save(conversation);
    return ResponseEntity.ok(saved);
}
    @PutMapping("/{id}")
    
    public ResponseEntity<?> updateConversation(@PathVariable String id, @RequestBody ChatConversation conversation) {
        conversation.setId(id);
        conversation.setUpdatedAt(System.currentTimeMillis());
        
        ChatConversation updated = chatConversationRepository.save(conversation);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<?> deleteConversation(@PathVariable String id) {
        chatConversationRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Conversation deleted"));
    }
}
