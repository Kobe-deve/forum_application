package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "friendsList")
public class FriendList {
    // primary id used to determine which user
    // has this friend list
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // id of the friend 
    public Long friend_id;

    // id of message logs relating to directly messaging friends 
    public Long friend_chat;
}
