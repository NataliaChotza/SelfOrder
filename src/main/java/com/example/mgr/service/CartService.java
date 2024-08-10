package com.example.mgr.service;

import com.example.mgr.controllers.CartController;
import com.example.mgr.dto.CartDto;
import com.example.mgr.mdbspringboot.model.Cart;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.CartRepository;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CartService {
    private static Logger logger = LoggerFactory.getLogger(CartService.class);
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemRepository itemRepository;

    public void saveItem(String itemId, String cartId) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        if (cartOpt.isPresent()) {
            Optional<Item> item = itemRepository.findById(itemId);
            Cart cart = cartOpt.get();
            item.ifPresent(i -> addItemToCart(item.get().getName(),cart));
            setCartPrice(cart);
            saveCart(cart);
        } else {
            logger.error(String.format("Cart not found %s", cartId));
        }
    }
    public void saveCart(Cart cart){
        cartRepository.save(cart);
    }

    public CartDto getCart(String cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        return cart.map(this::mapToDto).orElse(null);
    }
    private void addItemToCart(String itemName,Cart cart){
        cart.getItemsQuantity().compute(itemName,(k,v)-> v==null ? 1 : v+1);
    }

    private void setCartPrice(Cart cart){
        cart.setPrice(String.valueOf(cart.getItemsQuantity().entrySet().stream().mapToDouble(i->getItemPrice(i.getKey())* i.getValue()).sum()));
    }

    private double getItemPrice(String itemName){
        Item item = itemRepository.findItemByName(itemName);
        return item.getPrice();
    }

    private CartDto mapToDto(Cart cart) {
        return CartDto.builder().id(cart.getId()).items(getItemsForCart(cart)).itemsQuantity(cart.getItemsQuantity()).price(cart.getPrice()).paymentType(cart.getPaymentType()).build();
    }

    private List<Item> getItemsForCart(Cart cart) {
        List<Item> items = new ArrayList<>();
        cart.getItemsQuantity().keySet().forEach(name->items.add(itemRepository.findItemByName(name)));
        return items;
    }

}
