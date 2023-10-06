package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Room;
import com.example.backend.service.RoomService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService RoomService;

    // Get information on a specific room 
    @GetMapping(value = "/{room_id}")
    @ApiOperation(value = "{$RoomController.getRoomById}", response = Room.class, authorizations = {@Authorization(value="apiKey")})
    public Room getRoomById(@PathVariable("room_id") Long id)
    {
        return RoomService.findByRoomId(id);
    }

    // Get list of available rooms 
    @GetMapping("/publicRooms")
    public List<Room> getRooms()
    {
        return RoomService.getPublicRooms();
    }

    // Create a new room
    @PostMapping("/createRoom")
    public String createRoom(@RequestBody Room room) {
        if(RoomService.createRoom(room) != null)
            return "Room created!";
        else
            return "ERROR";
    }
}
