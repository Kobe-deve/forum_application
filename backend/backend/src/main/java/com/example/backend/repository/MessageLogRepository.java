package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.example.backend.models.Message;

@Component("MessageLogRepository")
public interface MessageLogRepository extends JpaRepository<Message, Long> {
    // get messages by message id 
    @Query(value = "SELECT * FROM message_log WHERE id = ?1", nativeQuery=true)
    List<Message> getMessages(Long id);
}
