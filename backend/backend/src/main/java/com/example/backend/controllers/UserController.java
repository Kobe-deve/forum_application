package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JWT_Token;
import com.example.backend.service.MailService;
import com.example.backend.service.UserService;
import com.example.enums.activityStatus;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private MailService emailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private JWT_Token JWT_Token;

    // Login to an account
    @PostMapping("/login")
    public ArrayList<String> loginWithCredentials(@RequestBody User user)
    {
        List<User> usernames = UserRepository.findByUsername(user.username);

        ArrayList<String> returnData = new ArrayList<String>();

        // check if username exists or is a verified account
        if(usernames.size() == 1 && user.password.equals(usernames.get(0).password) && usernames.get(0).status != activityStatus.UNVERIFIED)
        {
            returnData.add(JWT_Token.generateJWT(user.username,null).toString());
            returnData.add(user.username);
        }
        else if(usernames.get(0).status == activityStatus.UNVERIFIED)
        {
            returnData.add("ERROR: The account is not verified");
        }
        else
        {
            returnData.add("ERROR: Could not login");
        }
        
        return returnData;
    }

    @PostMapping("/signup")
    public ArrayList<String> createUser(@RequestBody User user) {

        List<User> usernames = UserRepository.findByUsername(user.username);

        ArrayList<String> returnData = new ArrayList<String>();

        if(usernames.size() == 0 && userService.createUser(user) != null)
        {
            String verificationLink = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()+"/verify/"+user.getID().toString();
            
            // send verification link email
            try{
                // TODO add email service
                // emailSender.sendEmail(user.email,"Verification Link",verificationLink);
                
                // temporarily removing unverified since SMTP isn't set up
                user.status = activityStatus.OFFLINE;

                returnData.add("User created!");
            }
            catch(Error e) // catch if email could not send
            {
                returnData.add("ERROR: Could not send verification email");
            }
        }
        else
            returnData.add("ERROR: Username exists");
        
        return returnData;
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