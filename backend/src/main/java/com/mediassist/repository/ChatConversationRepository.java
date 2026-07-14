package com.mediassist.repository;

import com.mediassist.model.ChatConversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatConversationRepository extends MongoRepository<ChatConversation, String> {
    List<ChatConversation> findByUserId(String userId);
}
