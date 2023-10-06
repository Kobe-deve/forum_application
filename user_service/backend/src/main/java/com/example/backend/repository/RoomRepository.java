package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.example.backend.models.Room;

@Component("RoomRepository")
public interface RoomRepository extends JpaRepository<Room, Long> {
    
    // get rooms by name
    @Query(value = "SELECT * FROM forum_room WHERE room_name = ?1", nativeQuery=true)
    List<Room> findByRoomName(String id);

    // get room by id 
    @Query(value = "SELECT * FROM forum_room WHERE id = ?1", nativeQuery=true)
    Room findByRoomId(Long id);

    // get public rooms 
    @Query(value = "SELECT * FROM forum_room WHERE status=0",nativeQuery=true)
    List<Room> getPublicRooms();
}
