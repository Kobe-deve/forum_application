package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.Authorization;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository UserRepository;

    // Create a new user
    @PostMapping("/login")
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

    @PostMapping("/signup")
    public String createUser(@RequestBody User user) {
        if(userService.createUser(user) != null)
            return "User created!";
        else
            return "ERROR: Username exists";
    }

    // Get user by ID
    @GetMapping(value = "/{id}")
    @ApiOperation(value = "{$UserController.getUserById}", response = User.class, authorizations = {@Authorization(value="apiKey")})
    @ApiResponses(value = {//
        @ApiResponse(code = 400, message = "Something went wrong"), //
        @ApiResponse(code = 403, message = "Access denied"), //
        @ApiResponse(code = 500, message = "Expired or invalid JWT token")})
    public Optional<User> getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }
}