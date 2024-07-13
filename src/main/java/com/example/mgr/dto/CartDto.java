package com.example.mgr.dto;

import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbspringboot.model.PaymentType;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDto {
    private String id;
    private List<Item> items;
    private PaymentType paymentType;

}
