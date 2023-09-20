package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "roomMembers")
public class RoomMembers {
    @Id
    public Long room_id;
    public Long user_id;
    public Long status;
}
