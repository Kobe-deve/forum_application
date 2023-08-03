package com.example.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.User;
import com.example.backend.models.activityStatus;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository UserRepository;

    // Create a new user
    public User createUser(User user) {
        user.status = activityStatus.OFFLINE;
        return UserRepository.save(user);
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return UserRepository.findById(id);
    }
}
