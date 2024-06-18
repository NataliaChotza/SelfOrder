package com.example.mgr;

import com.example.mgr.mdbspringboot.model.CategoryEnum;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import org.apache.commons.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    @Autowired
    private ItemRepository menuItemRepo;
    public void createItems() {
        logger.info("Initializing data...");
        menuItemRepo.save(new Item("Backed chicken", "Chicken backed in the oven", "150g", CategoryEnum.MAIN_DISH));
        menuItemRepo.save(new Item("Bread", "Freshly backed bread", "100g", CategoryEnum.APPETISER));
        menuItemRepo.save(new Item("Water", "water", "500", CategoryEnum.DRINKS_NO_ALK));

    }

    @Override
    public void run(String... args) throws Exception {
        createItems();
    }
}
