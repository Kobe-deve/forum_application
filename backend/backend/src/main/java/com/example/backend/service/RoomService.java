package com.example.backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.Room;
import com.example.backend.repository.RoomRepository;

@Service
public class RoomService {
    @Autowired
    private RoomRepository RoomRepository;

    public Room createRoom(Room newRoom) {
        // check if the room can be created 
        if(RoomRepository.findByRoomName(newRoom.roomName).size() > 0)
        {
            return null;
        }
        else
        {
            newRoom.time_created = new Date();
            return RoomRepository.save(newRoom);    
        }
    }

     // Get user by ID
    public Room findByRoomId(Long id) {
        return RoomRepository.findByRoomId(id);
    }
}
