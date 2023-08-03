package com.example.backend.models;

import java.util.Date;

public class Message {
    // message body
    public String text;
    
    // time information of when the message was sent 
    public Date time_stamp;

    // id of the user who sent the message 
    public String user_id;
}
