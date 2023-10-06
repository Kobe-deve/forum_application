package com.example.enums;


// room statuses
/*
    OPEN - 1
    LOCKED - 2
    CLOSED - 3
 */
public enum activeStatus
{
    OPEN(1),
    LOCKED(2),
    CLOSED(3);

    private int id;

    activeStatus(int id){
        this.id = id;
    }

    public int getID(){
        return id;
    }
};