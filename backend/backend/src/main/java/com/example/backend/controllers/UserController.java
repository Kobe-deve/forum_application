package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JWT_Token;
import com.example.backend.service.UserService;
import com.example.enums.activityStatus;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private JWT_Token JWT_Token;

    // Create a new user
    @PostMapping("/login")
    public String loginWithCredentials(@RequestBody User user)
    {
        List<User> usernames = UserRepository.findByUsername(user.username);

        // check if username exists 
        if(usernames.size() == 1 && user.password.equals(usernames.get(0).password))
        {
            return JWT_Token.generateJWT(user.username,null).toString();
        }
        else
            return "ERROR: Could not login";
    }

    @PostMapping("/signup")
    public String createUser(@RequestBody User user) {
        if(userService.createUser(user) != null)
            return JWT_Token.generateJWT(user.username,null).toString();
        else
            return "ERROR: Username exists";
    }

    // Get user by ID
    @GetMapping(value = "/{id}")
    @ApiOperation(value = "{$UserController.getUserById}", response = User.class, authorizations = {@Authorization(value="apiKey")})
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    // verify a user so they can access their account
    @GetMapping("/verify/{user_id}")
    public String verifyUser(@PathVariable("user_id") Long id)
    {
        User verifyUser = userService.getUserById(id);

        if(verifyUser != null && verifyUser.status == activityStatus.UNVERIFIED)
        {
            verifyUser.status = activityStatus.OFFLINE;
            return "User verified";
        }
        
        return "ERROR: Could not verify user";
    }
}