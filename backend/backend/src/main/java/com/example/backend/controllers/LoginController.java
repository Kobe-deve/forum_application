package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserRepository UserRepository;
    
    // log into an account
    @PostMapping 
    public boolean loginWithCredentials(@RequestBody User user)
    {
        List<User> usernames = UserRepository.findByUsername(user.username);

        // check if username exists 
        if(usernames.size() == 1 && user.password.equals(usernames.get(0).password))
        {
            return true;
        }
        else
            return false;
    }
}
