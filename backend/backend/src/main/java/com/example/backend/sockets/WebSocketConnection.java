package com.example.backend.sockets;

import java.time.LocalDateTime;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class WebSocketConnection extends TextWebSocketHandler  {

    private static final Gson gson = new GsonBuilder().create();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("connected with the websocket client : " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject parsedMessage = gson.fromJson(message.getPayload(), JsonObject.class);

        System.out.println("The message got from the client is " + parsedMessage);

        JsonObject responseMessage = new JsonObject();
        responseMessage.addProperty("response", "Your response was recorded by the server");
        responseMessage.addProperty("messageReceivedtime", LocalDateTime.now().toLocalDate().toString());
        int max = 100;
        int min = 20;
        responseMessage.addProperty("randomNo", (int) Math.floor(Math.random() * (max - min + 1) + min));

        session.sendMessage(new TextMessage(responseMessage.toString())); //sending message back to the client
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("connection closed from the websocket client : " + session.getId());
    }
}
