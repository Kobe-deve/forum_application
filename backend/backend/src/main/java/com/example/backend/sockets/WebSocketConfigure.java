package com.example.backend.sockets;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// sets up web socket configuration for the backend

@Configuration
@EnableWebSocket
public class WebSocketConfigure implements WebSocketConfigurer  {

  @Bean
  public WebSocketConnection getWebSocketConnection() {
      return new WebSocketConnection();
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(getWebSocketConnection(), "/sockettest").setAllowedOrigins("*");
  }
}
