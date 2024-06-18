package com.example.mgr.mdbspringboot.model;


import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("item")
@Data
public class Item {
    @Id
    private String id;
    private String name;
    private String description;
    private String quantity;
    private CategoryEnum category;

    public Item(String name, String description, String quantity, CategoryEnum category){
        super();
        this.name=name;
        this.quantity=quantity;
        this.description=description;
        this.category = category;
    }
}
