package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.FriendList;

@RestController
@RequestMapping("/friends")
public class FriendListController {

    // return a list of all the friends the user has 
    @GetMapping("/list")
    public List<FriendList> friendList()
    {
        return null;
    }

    // get all friend requests the user has received
    @GetMapping("/requests")
    public List<String> allRequests()
    {
        return null;
    }

    // sending a friend request
    @PostMapping("/request/{user_id}")
    public String sendFriendRequest(@PathVariable("user_id") Long id)
    {
        return "Friend Request sent!";
    }

    // removing a user from the friends list 
    @PostMapping("/remove/{user_id}")
    public String removeFriend(@PathVariable("user_id") Long id)
    {
        return "Friend removed";
    }

    // accept friend request
    @PostMapping("/accept/{user_id}")
    public String acceptFriendRequest(@PathVariable("user_id") Long id)
    {
        return "Friend added";
    }
}
