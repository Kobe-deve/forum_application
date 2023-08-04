package com.example.backend.models;

import java.util.Date;

import com.example.enums.activeStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "forumRoom")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // creation date of the room 
    public Date time_created;

    // id for message log
    public Long message_log_id;
    
    // room status 
    public activeStatus status;

    // password for the room if it is locked 
    private String password;

    // set password 
    void setPassword(String set)
    {
        this.password = set;
    }

    // check if input string matches password 
    boolean matchesPassword(String input)
    {
        return this.password.equals(input);
    }
}
