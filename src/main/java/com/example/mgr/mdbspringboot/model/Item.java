package com.example.mgr.mdbspringboot.model;


import org.springframework.data.mongodb.core.mapping.Document;


@Document("item")
public class Item {
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescrption() {
        return descrption;
    }

    public void setDescrption(String descrption) {
        this.descrption = descrption;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

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
