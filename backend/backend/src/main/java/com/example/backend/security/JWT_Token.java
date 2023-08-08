package com.example.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWT_Token {
    @Value("${jwt.signature}")
    private String signature;

    public String displaySig()
    {
        return signature;
    }
}
