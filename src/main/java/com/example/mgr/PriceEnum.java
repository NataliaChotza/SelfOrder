package com.example.mgr;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PriceEnum {
    PLN("zł");
    private final String value;

}
