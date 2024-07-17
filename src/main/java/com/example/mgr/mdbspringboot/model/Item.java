package com.example.mgr.mdbspringboot.model;


import lombok.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;


@Document("item")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    private String id;
    @NotNull
    private String name;
    @NotNull
    private String description;
    @NotNull
    private String quantity;
    @NotNull
    private BigDecimal price;
    @NotNull
    private String currency;
    @NotNull
    private CategoryEnum category;

}
