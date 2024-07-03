package com.example.mgr.mdbspringboot.model;


import lombok.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document("item")
@Data
@Getter
@Setter
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
    private CategoryEnum category;

}
