package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Room;
import com.example.backend.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService RoomService;

    // Create a new room
    @PostMapping
    public String createRoom(@RequestBody Room room) {
        if(RoomService.createRoom(room) != null)
            return "Room created!";
        else
            return "ERROR";
    }
}
