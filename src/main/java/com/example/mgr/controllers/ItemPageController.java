package com.example.mgr.controllers;

import com.example.mgr.dto.ItemDto;
import com.example.mgr.service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class ItemPageController {
    private static Logger logger = LoggerFactory.getLogger(ItemPageController.class);

    @Autowired
    private ItemService itemService;
    @GetMapping("/items/{itemId}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable String itemId) {
        ItemDto item = itemService.getItemById(itemId);
        if(item == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        else{
            logger.info(String.format("Sent Item  %s to front",item.getId()));
            return ResponseEntity.ok(item);
        }
    }
}
