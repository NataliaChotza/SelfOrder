package com.example.mgr.mdbspringboot.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("table")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Table {

    @Id
    private String tableNumber;
    private String capacity;
    private List<Cart> carts;
    private String price;
    private String status;
}
