package com.example.mgr.controllers;

import com.example.mgr.dto.CartDto;
import com.example.mgr.mdbspringboot.model.Cart;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CartController {

    private static Logger logger = LoggerFactory.getLogger(CartController.class);
    @Autowired
    private CartService cartService;

    //do zmiany cartId będzie sie podstawiać po skanowaniu QR
    @PostMapping("/cart/{cartId}/{itemId}")
    public ResponseEntity saveItemToCart(@PathVariable String itemId, @PathVariable String cartId){
        cartService.saveItem(itemId,cartId);
        logger.info("Saved item to cart");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<CartDto> getCart(@PathVariable String cartId){
        CartDto cartDto = cartService.getCart(cartId);
        if (cartDto!=null)
            return ResponseEntity.ok(cartDto);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/cart/{cartId}/items")
    public ResponseEntity<Map<String,Integer>> getCartItems(@PathVariable String cartId) {
        CartDto cart = cartService.getCart(cartId);
        if (cart != null) {
            Map<String,Integer> items = cart.getItemsQuantity();
            return ResponseEntity.ok(items);
            } else
                logger.info("No cart with this id");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/cart/{cartId}")
    public ResponseEntity updateCart(@RequestBody Cart cart){
        cartService.saveCart(cart);
        logger.info("Updated cart");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
