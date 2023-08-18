package com.example.backend.security;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWT_Token {

    // signature/secret key for generating JWT
    @Value("${jwt.signature}")
    private String signature;

    private long validityInMilliseconds = 360000;

    // initialize
    @PostConstruct
    protected void init() {
        signature = Base64.getEncoder().encodeToString(signature.getBytes());
    }

    // generate a JWT
    public String generateJWT(String username, Long current_room)
    {
        // set claims on token
        Claims claims = Jwts.claims().setSubject(username);

        // set current room to be negative since the user isn't currently in any room
        claims.put("current_room","-1");

        // set time information
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        System.out.println(validity.toString());
        
        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity).signWith(SignatureAlgorithm.HS256, signature).compact();
    }

    // get the username of the user with the JWT
    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(signature).parseClaimsJws(token).getBody().getSubject();
    }

    // verify the JWT and make sure it hasn't expired
    public boolean verifyJWT(String token){
        try {
            Jwts.parser().setSigningKey(signature).parseClaimsJws(token);
            Date expiration = Jwts.parser().setSigningKey(signature).parseClaimsJws(token).getBody().getExpiration();
            
            Date now = new Date();
            return now.before(expiration);
        } catch (ArrayIndexOutOfBoundsException | JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // get the current room the user with the JWT is in
    public String getRoom(String token) {
        return Jwts.parser().setSigningKey(signature).parseClaimsJws(token).getBody().get("current_room").toString();
    }
}
