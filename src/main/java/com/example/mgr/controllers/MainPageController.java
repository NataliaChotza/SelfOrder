package com.example.mgr.controllers;

import com.example.mgr.mdbspringboot.model.CategoryEnum;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MainPageController {
    @Autowired
    private ItemRepository menuItemRepo;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        System.out.println("send items to front");
        return menuItemRepo.findAll();
    }

    @GetMapping("/items/item/{itemId}")
    public Item getItemById(@PathVariable String itemId) {
        Optional<Item> item = menuItemRepo.findById(itemId);
        return item.get();
    }

}
//}
//    public void updateCategoryName(String category) {
//
//        // Change to this new value
//        String newCategory = "munchies";
//
//        // Find all the items with the category snacks
//        List<GroceryItem> list = groceryItemRepo.findAll(category);
//
//        list.forEach(item -> {
//            // Update the category in each document
//            item.setCategory(newCategory);
//        });
//
//        // Save all the items in database
//        List<GroceryItem> itemsUpdated = groceryItemRepo.saveAll(list);
//
//        if(itemsUpdated != null)
//            System.out.println("Successfully updated " + itemsUpdated.size() + " items.");



