package com.example.mgr.mdbspringboot.model;

import lombok.Getter;

@Getter
public enum PaymentType {
    CARD("karta"),CASH("gotówka"),BLIK("blik");

    PaymentType(String value){
        this.value = value;
    }
    private final String value;
}
