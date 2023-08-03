package com.example.backend.models;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "messageLog")
public class Message {
    @Id
    // time information of when the message was sent 
    public Date time_stamp;

    // message body
    public String text;
    
    // id of the user who sent the message 
    public String user_id;
}
