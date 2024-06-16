package com.example.mgr.controllers;

import com.example.mgr.mdbspringboot.model.CategoryEnum;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainPageController {

    @Autowired
    private ItemRepository menuItemRepo;
    public void createItem() {
        menuItemRepo.save(new Item("Backed chicken", "Chicken backed in the oven", "150g", CategoryEnum.MAIN_DISH));
        menuItemRepo.save(new Item("Bread", "Freshly backed bread", "100g", CategoryEnum.APPETISER));
        menuItemRepo.save(new Item("Water", "water", "500", CategoryEnum.DRINKS_NO_ALK));

    }

    @GetMapping("/items")
    public List<Item> getAllItems() {
        createItem();
        return getMenuItemRepo().findAll();
    }

    public void getItemByName(String name) {
        Item item = getMenuItemRepo().findItemByName(name);
        System.out.println(getItemDetails(item));
    }

    public String getItemDetails(Item item) {
        System.out.println(item.getName() + " " + item.getDescription() + " " + item.getQuantity() + " " + item.getCategory());
        return "";
    }
    public ItemRepository getMenuItemRepo() {
        return menuItemRepo;
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



