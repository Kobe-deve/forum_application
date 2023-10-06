package com.example.backend.models;

import java.util.Date;

import com.example.enums.activeStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "forumRoom")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    // creation date of the room 
    public Date time_created;
    
    // room status 
    public activeStatus status;

    // room name
    public String roomName;

    // id of the user who created the room 
    public Long creator_id;

    // password for the room if it is locked 
    private String password;

    // set password 
    public void setPassword(String set)
    {
        this.password = set;
    }

    // check if input string matches password 
    public boolean matchesPassword(String input)
    {
        return this.password.equals(input);
    }
}
