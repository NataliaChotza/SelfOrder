package com.example.mgr.service;

import com.example.mgr.dto.ItemDto;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Builder
public class MenuService {
    private static final Logger logger = LoggerFactory.getLogger(MenuService.class);
    @Autowired
    private ItemRepository menuItemRepo;


    public List<ItemDto> getMenu() {
        System.out.println("send items to front");
        try{
        List<Item> items = menuItemRepo.findAll();
        return items.stream().map(ItemService::mapToDto).collect(Collectors.toList());
        }catch (Exception ex){
            logger.error(ex.getMessage());
        }
        return null;

    }
}
