package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Message;
import com.example.backend.models.User;
import com.example.backend.service.MessageLogService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

@RestController
@RequestMapping("/message")
public class MessageLogController {
    @Autowired
    private MessageLogService MessageLogService;

    @PostMapping("/send")
    @ApiOperation(value = "{$MessageLogController.sendMessage}", response = User.class, authorizations = {@Authorization(value="apiKey")})
    public String sendMessage(@RequestBody Message message)
    {
        if(MessageLogService.createMessage(message) != null)
            return "Message created";
        else
            return "ERROR: Cannot send message";
    }
}
