package com.example.backend.models;

import java.util.Date;

import jakarta.persistence.*;

// room statuses
enum activeStatus
{
    OPEN,
    LOCKED,
    CLOSED,
};

@Entity
@Table(name = "forumRoom")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // creation date of the room 
    public Date time_created;
    
    // room status 
    public activeStatus status;

    // password for the room if it is locked 
    public String password;
}
