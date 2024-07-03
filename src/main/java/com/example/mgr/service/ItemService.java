package com.example.mgr.service;

import com.example.mgr.dto.ItemDto;
import com.example.mgr.mdbspringboot.model.Item;
import com.example.mgr.mdbsrping.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemDto getItemById(String itemId) {
        Optional<Item> item = itemRepository.findById(itemId);
        ItemDto itemDto;
        if(item.isPresent())
             itemDto = mapToDto(item.get());
        else
            return null;
        return itemDto;
    }
    public static ItemDto mapToDto(Item item) {
        return ItemDto.builder().id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .quantity(item.getQuantity())
                .category(item.getCategory())
                .build();
    }
}
