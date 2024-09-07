package com.example.mgr.mdbspringboot.model;

import lombok.Getter;

@Getter
public enum TableStatus {

    OCCUPIED("zajęty"),
    RESERVED("zarezerwowany"),
    FREE("wolny");

    TableStatus(String value){
        this.value = value;
    }
    private final String value;
}
