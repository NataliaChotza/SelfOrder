package com.example.mgr.controllers;

import com.example.mgr.mdbspringboot.model.CategoryEnum;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller

public class MainPageController {

    @Autowired
    private ItemRepository menuItemRepo;
    public void createItem() {
        menuItemRepo.save(new Item("Backed chicken", "Chicken backed in the oven", "150g", CategoryEnum.MAIN_DISH));
        menuItemRepo.save(new Item("Bread", "Freshly backed bread", "100g", CategoryEnum.APPETISER));
        menuItemRepo.save(new Item("Water", "water", "500", CategoryEnum.DRINKS_NO_ALK));

    }

    public List<Item> showAllItems() {
        return menuItemRepo.findAll();
    }

    public void getItemByName(String name) {
        Item item = menuItemRepo.findItemByName(name);
        System.out.println(getItemDetails(item));
    }

    public String getItemDetails(Item item) {
        System.out.println(item.getName() + " " + item.getDescrption() + " " + item.getQuantity() + " " + item.getCategory());
        return "";
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



