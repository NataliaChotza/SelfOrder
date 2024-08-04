package com.example.mgr.controllers;

import com.example.mgr.dto.ItemDto;
import com.example.mgr.service.MenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MainPageController {
    private static Logger logger = LoggerFactory.getLogger(MainPageController.class);
    @Autowired
    private MenuService menuService;


    @GetMapping("/items")
    public ResponseEntity<List<ItemDto>> getAllItems() {
        List<ItemDto> items = menuService.getMenu();
        if(items.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(items);
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



