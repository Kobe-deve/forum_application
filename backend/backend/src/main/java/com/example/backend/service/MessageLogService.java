package com.example.backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.Message;
import com.example.backend.repository.MessageLogRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.UserRepository;

@Service
public class MessageLogService {
    @Autowired
    private MessageLogRepository MessageLogRepository;

    @Autowired
    private RoomRepository RoomRepository;

    @Autowired
    private UserRepository UserRepository;

    public Message createMessage(Message message)
    {
        if(message.user_id != null && message.text != null && message.room_id != null && (UserRepository.findById(message.user_id) != null) && (RoomRepository.findByRoomId(message.room_id) != null) )
        {
            message.time_stamp = new Date();
            message.setUsername(UserRepository.getReferenceById(message.user_id).username);
            return MessageLogRepository.save(message);
        }
        else
            return null;
    }
}
