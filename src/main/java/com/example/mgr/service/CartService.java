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

import java.util.Optional;

@Service
public class CartService {
    private static Logger logger = LoggerFactory.getLogger(CartService.class);
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemRepository itemRepository;

    public void saveItem(String itemId, String cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isPresent()) {
            Optional<Item> item = itemRepository.findById(itemId);
            Cart cart1 = cart.get();
            item.ifPresent(i -> cart1.getItems().add(i));
            saveCart(cart1);
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

    private CartDto mapToDto(Cart cart) {
        return CartDto.builder().id(cart.getId()).items(cart.getItems()).paymentType(cart.getPaymentType()).build();
    }
}
