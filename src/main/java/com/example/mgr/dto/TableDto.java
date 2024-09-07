package com.example.mgr.dto;

import com.example.mgr.mdbspringboot.model.Cart;
import com.example.mgr.mdbspringboot.model.TableStatus;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TableDto {

    @NotNull
    private String tableNumber;
    private List<Cart> carts;
    private String capacity;
    private String price;
    private String status;

}
