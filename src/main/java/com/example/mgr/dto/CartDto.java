package com.example.mgr.dto;

import com.example.mgr.mdbspringboot.model.CartStatus;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbspringboot.model.PaymentType;
import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDto {
    private String id;
    private Map<String,Integer> itemsQuantity;
    private List<Item> items;
    private String price;
    private String paymentType;
    private String status;

}
