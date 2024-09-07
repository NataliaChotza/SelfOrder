package com.example.mgr.mdbspringboot.model;

import lombok.Getter;

@Getter
public enum CartStatus {
    PAID("Opłacony"),
    UNPAID("Nieopłacony");

    CartStatus(String value){
        this.value = value;
    }
    private final String value;
}
