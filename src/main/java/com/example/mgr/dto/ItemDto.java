package com.example.mgr.dto;

import com.example.mgr.mdbspringboot.model.CategoryEnum;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ItemDto {
    private String id;
    private String name;
    private String description;
    private String quantity;
    private CategoryEnum category;

}
