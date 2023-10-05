package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JWT_Token;
//import com.example.backend.service.MailService;
import com.example.backend.service.UserService;
import com.example.enums.activityStatus;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/users")
public class UserController {
//    @Autowired
//    private MailService emailSender;

    @Autowired
    private UserService UserService;

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
        if(usernames.size() == 1)
        {
            if(user.password.equals(usernames.get(0).password) && usernames.get(0).status != activityStatus.UNVERIFIED)
            {
                returnData.add(JWT_Token.generateJWT(user.username,null).toString());
                returnData.add(user.username); 
            }
            else if(usernames.get(0).status == activityStatus.UNVERIFIED)
            {
                returnData.add("ERROR: The account is not verified");
            }
        }
        else
        {
            returnData.add("ERROR: Could not login");
        }
        
        return returnData;
    }

    // checking email pattern
    public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public static boolean validateEmail(String emailStr) {
            Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
            return matcher.matches();
    }

    @PostMapping("/signup")
    public ArrayList<String> createUser(@RequestBody User user) {

        List<User> usernames = UserRepository.findByUsername(user.username);

        ArrayList<String> returnData = new ArrayList<String>();

        if(user.username.length() > 0 && user.password.length() > 0 && validateEmail(user.email))
        {
            if(usernames.size() == 0)
            {
                if(UserService.createUser(user) != null)
                {
                    //String verificationLink = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()+"/verify/"+user.getID().toString();
                    
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
                {
                    returnData.add("ERROR: Could not create user");
                }
            }
            else
            {
                returnData.add("ERROR: Username exists");
            }
        }
        else
        {
            returnData.add("ERROR: Username/Password/Email invalid");
        }

        return returnData;
    }

    @GetMapping("/getByUsername/{username}")
    @ApiOperation(value = "{$UserController.getUserByUsername}", response = User.class, authorizations = {@Authorization(value="apiKey")})
    public User getUserByUsername(@PathVariable("username") String username) {
        return UserService.getUserByUsername(username);
    }

    // Get user by ID
    @GetMapping(value = "/{id}")
    @ApiOperation(value = "{$UserController.getUserById}", response = User.class, authorizations = {@Authorization(value="apiKey")})
    public User getUserById(@PathVariable("id") Long id) {
        return UserService.getUserById(id);
    }

    // verify a user so they can access their account
    @GetMapping("/verify/{user_id}")
    public String verifyUser(@PathVariable("user_id") Long id)
    {
        User verifyUser = UserService.getUserById(id);

        if(verifyUser != null && verifyUser.status == activityStatus.UNVERIFIED)
        {
            verifyUser.status = activityStatus.OFFLINE;
            return "User verified";
        }
        
        return "ERROR: Could not verify user";
    }

    // authenticate the user given the jwt token
    @PostMapping("/authenticate")
    public Map<String,Object> verifyToken(@RequestBody Map<String, String> payload)
    {
        Map<String,Object> returnedElements = new HashMap<String,Object>();

        if(payload.get("Token") != null)
        {
            // check if the token isn't expired
            boolean verified = JWT_Token.verifyJWT(payload.get("Token"));
            returnedElements.put("status",verified);

            if(verified)
            {
                String username = JWT_Token.getUsername(payload.get("Token"));
                String room = JWT_Token.getRoom(payload.get("Token"));

                returnedElements.put("token",JWT_Token.generateJWT(username,Long.parseLong(room)));
                
            }
        }
        else
            returnedElements.put("status",false);
        
        return returnedElements;
    }
}