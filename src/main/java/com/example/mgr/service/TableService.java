package com.example.mgr.service;


import com.example.mgr.dto.TableDto;
import com.example.mgr.mdbspringboot.model.Table;
import com.example.mgr.mdbsrping.repository.TableRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
@Builder
public class TableService {

    @Autowired
    private TableRepository repository;

    public TableDto getTable(String tableNumber){
        Optional<Table> optTable = repository.findByTableNumber(tableNumber);
        return optTable.map(this::mapToDto).orElseThrow(()->
                new IllegalArgumentException(String.format("Table not found %s",tableNumber)));

    }

    public TableDto updateTable(TableDto table){
        Optional<Table> optTable = repository.findByTableNumber(table.getTableNumber());
        TableDto tableDto;

        tableDto=optTable.map(this::mapToDto).orElseThrow(()->
                    new IllegalArgumentException(String.format("Table not found %s",table.getTableNumber())));

        tableDto.setPrice(table.getPrice());
        tableDto.setStatus(table.getStatus());
        tableDto.setCarts(table.getCarts());
        return tableDto;
    }
    public List<TableDto> getTables() {
        List<Table> tables = repository.findAll();
        List<TableDto>tableDtos = new ArrayList<>();
        tables.stream().forEach(table->tableDtos.add(mapToDto(table)));
        return tableDtos;
    }


    public void addTable(TableDto tableDto) {
        Optional<Table> optTable = repository.findByTableNumber(tableDto.getTableNumber());
        if(optTable.isPresent()){
            throw  new IllegalArgumentException("Table with this number exist");
        }else{
            repository.save(mapToTable(tableDto));
        }

    }

    private TableDto mapToDto(Table table){
        return TableDto.builder()
                .tableNumber(table.getTableNumber())
                .carts(table.getCarts())
                .status(table.getStatus())
                .price(table.getPrice())
                .capacity(table.getCapacity())
                .build();
    }

    private Table mapToTable(TableDto table){
        return Table.builder()
                .tableNumber(table.getTableNumber())
                .carts(table.getCarts())
                .status(table.getStatus())
                .price(table.getPrice())
                .capacity(table.getCapacity())
                .build();
    }

}
