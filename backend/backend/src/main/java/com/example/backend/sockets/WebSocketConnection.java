package com.example.backend.sockets;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.backend.models.Message;
import com.example.backend.models.User;
import com.example.backend.repository.MessageLogRepository;
import com.example.backend.repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;


public class WebSocketConnection extends TextWebSocketHandler  {
    @Autowired
    private MessageLogRepository MessageLogRepository;

    @Autowired
    private UserRepository UserRepository;

    private static final Gson gson = new GsonBuilder().create();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("connected with the websocket client : " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject parsedMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        
        int accessedRoom = parsedMessage.get("room_id").getAsInt();

        JsonObject responseMessage = new JsonObject();

        ArrayList<JsonObject> messages = new ArrayList<JsonObject>();

        System.out.println("SENT MESSAGE:" + message.toString());

        for (Message i : MessageLogRepository.getMessages((long) accessedRoom)) 
        {
            JsonObject specificMessage = new JsonObject();
            
            // if the sender is unknown, get it
            if(i.getUsername() == null)
            {
                User sender = UserRepository.findById(i.user_id).get();
                i.setUsername(sender.username);
            }

            specificMessage.addProperty("message_sender", i.getUsername());
            specificMessage.addProperty("message_timeStamp", i.time_stamp.toString());
            specificMessage.addProperty("message_text", i.text.toString());
            
            messages.add(specificMessage);
        }

        responseMessage.addProperty("messages", messages.toString());
        session.sendMessage(new TextMessage(responseMessage.toString())); //sending message back to the client
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("connection closed from the websocket client : " + session.getId());
    }
}
