package com.example.mgr;

import com.example.mgr.mdbspringboot.model.Cart;
import com.example.mgr.mdbspringboot.model.CategoryEnum;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.CartRepository;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;

@Component
public class DataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    @Autowired
    private ItemRepository menuItemRepo;
    @Autowired
    private CartRepository cartRepository;

    public void createItems() {
        logger.info("Initializing data...");

        Item item1 = Item.builder()
                .id("item_1")
                .name("Backed Chicken")
                .description("Chicken backed in the oven")
                .quantity("100g")
                .price(new BigDecimal("35.99"))
                .currency(PriceEnum.PLN.getValue())
                .category(CategoryEnum.MAIN_DISH)
                .build();

        Item item2 = Item.builder()
                .id("item_2")
                .name("Bread")
                .description("Freshly backed bread")
                .quantity("100g")
                .price(new BigDecimal("14.00"))
                .currency(PriceEnum.PLN.getValue())
                .category(CategoryEnum.APPETISER).build();
        Item item3 = Item.builder().id("item_3").name("Water")
                .description("water")
                .quantity("500")
                .price(new BigDecimal("6.99"))
                .currency(PriceEnum.PLN.getValue())
                .category(CategoryEnum.DRINKS_NO_ALK).build();


        Cart cart = Cart.builder().id("cart1").items(new ArrayList<>()).build();
        cartRepository.save(cart);

        menuItemRepo.save(item1);
        menuItemRepo.save(item2);
        menuItemRepo.save(item3);

        logger.info("Data Initialized");
    }

    @Override
    public void run(String... args) throws Exception {
        createItems();
    }
}
