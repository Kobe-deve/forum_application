package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    // suspending a room 
    @PostMapping("/room/{room_id}")
    public String suspendRoom(@PathVariable("room_id") Long id)
    {
        return "Room Suspended";
    }

    // suspending a user
    @PostMapping("/user/{user_id}")
    public String suspendUser(@PathVariable("user_id") Long id)
    {
        return "User Suspended";
    }
}
