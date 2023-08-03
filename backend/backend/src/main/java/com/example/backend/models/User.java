package com.example.backend.models;

import jakarta.persistence.*;

import java.util.ArrayList;

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

    // list of friends 
    public ArrayList<Long> friendsList;

    // list of rooms accessed 
    public ArrayList<String> accessibleRooms;
}
