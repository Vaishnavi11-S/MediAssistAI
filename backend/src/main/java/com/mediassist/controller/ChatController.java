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
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserConversations(Authentication authentication) {
        String userId = authentication.getName();
        List<ChatConversation> conversations = chatConversationRepository.findByUserId(userId);
        return ResponseEntity.ok(conversations);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createConversation(@RequestBody ChatConversation conversation, Authentication authentication) {
        conversation.setUserId(authentication.getName());
        conversation.setCreatedAt(System.currentTimeMillis());
        conversation.setUpdatedAt(System.currentTimeMillis());
        
        ChatConversation saved = chatConversationRepository.save(conversation);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateConversation(@PathVariable String id, @RequestBody ChatConversation conversation) {
        conversation.setId(id);
        conversation.setUpdatedAt(System.currentTimeMillis());
        
        ChatConversation updated = chatConversationRepository.save(conversation);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteConversation(@PathVariable String id) {
        chatConversationRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Conversation deleted"));
    }
}
