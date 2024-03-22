package com.example.mgr.mdbspringboot.model;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("item")
@Data
public class Item {
    private String name;
    private String descrption;
    private String quantity;
    private CategoryEnum category;

    public Item(String name, String descrption, String quantity, CategoryEnum category){
        super();
        this.name=name;
        this.quantity=quantity;
        this.descrption=descrption;
        this.category = category;
    }
}
