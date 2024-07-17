package com.example.mgr.dto;

import com.example.mgr.mdbspringboot.model.CategoryEnum;
import lombok.*;

import java.math.BigDecimal;

@Data
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
    private String currency;
    private BigDecimal price;

}
