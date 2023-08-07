package com.example.backend.models;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "messageLog")
public class Message {
    // time information of when the message was sent 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long message_key;

    public Date time_stamp;
    
    // id used to determine which chat this belongs to 
    public Long room_id;

    // message body
    public String text;
    
    // id of the user who sent the message 
    public Long user_id;
}
