package com.example.backend.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.enums.activityStatus;

@Service
public class UserService {
    @Autowired
    private UserRepository UserRepository;

    // Create a new user
    public User createUser(User user) {
        // check if the username exists
        if(user.password.length() < 5 & UserRepository.findByUsername(user.username).size() > 0)
            return null;
        else
        {
            // set intial values
            user.status = activityStatus.OFFLINE;
            user.time_stamp = new Date();
            
            // generate friends list id for future use
            user.friendsList = user.time_stamp.getTime();

            return UserRepository.save(user);
        }
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return UserRepository.findById(id);
    }
}
