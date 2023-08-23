package com.example.backend.models;

import jakarta.persistence.*;

import java.util.Date;

import com.example.enums.activityStatus;

@Entity
@Table(name = "forumUser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // username for logging in/identifying the user in the chat 
    public String username;

    // login password
    public String password;

    // email for registration
    public String email;

    // account creation date
    public Date time_stamp;

    // id for friends list 
    public Long friendsList;

    // whether a user is online/offline 
    public activityStatus status;

    public User(String usern, String pass, String mail) {
        this.username = usern;
        this.password = pass;
        this.email = mail;
    }

    public Long getID()
    {
        return id;
    }
}
