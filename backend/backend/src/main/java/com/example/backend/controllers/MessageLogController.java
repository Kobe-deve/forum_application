package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Message;
import com.example.backend.models.Report;
import com.example.backend.models.User;
import com.example.backend.repository.MessageLogRepository;
import com.example.backend.service.MessageLogService;
import com.example.backend.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

@RestController
@RequestMapping("/message")
public class MessageLogController {
    @Autowired
    private MessageLogRepository MessageLogRepository;

    @Autowired
    private UserService UserService;
    
    @Autowired
    private MessageLogService MessageLogService;
    
    @MessageMapping("/sendMessage")
    @SendTo("/currentMessages/message")
    public Message greeting(Message message) throws Exception {
        Thread.sleep(1000); // simulated delay
        User sender = UserService.getUserById(message.user_id);

        if(sender != null)
            message.setUsernameString(sender.username);
        
        return message;
    }

    // getting a list of all messages in the message log 
    @GetMapping("/{message_log_id}")
    public List<Message> getMessageLog(@PathVariable("message_log_id") Long id)
    {
        return MessageLogRepository.getMessages(id);
    }

    // get the most recent message in the message log
    @GetMapping("/recent/{message_log_id}")
    public Message getRecentMessage(@PathVariable("message_log_id") Long id)
    {
        return MessageLogRepository.getMessages(id).get(0);
    }

    // sending a message to a chat 
    @PostMapping("/send")
    @ApiOperation(value = "{$MessageLogController.sendMessage}", response = User.class, authorizations = {@Authorization(value="apiKey")})
    public String sendMessage(@RequestBody Message message)
    {
        if(MessageLogService.createMessage(message) != null)
            return "Message created";
        else
            return "ERROR: Cannot send message";
    }

    // reporting a message
    @PostMapping("/report")
    public String report(@RequestBody Report report)
    {
        return "Report sent";
    }
}
