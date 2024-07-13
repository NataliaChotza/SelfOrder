package com.example.mgr.mdbspringboot.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("cart")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    private String id;
    private List<Item> items;
    private PaymentType paymentType;
}
