package com.example.mgr.controllers;

import com.example.mgr.dto.TableDto;
import com.example.mgr.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TableController {

    @Autowired
    private TableService tableService;

    @GetMapping("/tables/{tableNumber}")
    public ResponseEntity<TableDto> getTable(@PathVariable String tableNumber) {
        TableDto tableDto;
        try {
            tableDto = tableService.getTable(tableNumber);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tableDto, HttpStatus.OK);
    }
    @GetMapping("/tables")
    public ResponseEntity<List<TableDto>> getTable() {
        List<TableDto> tables;
        try {
            tables = tableService.getTables();
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tables, HttpStatus.OK);
    }

    @PatchMapping("/tables")
    public ResponseEntity<TableDto> updateTable(@Validated @RequestBody TableDto table) {
        TableDto tableDto;
        try {
            tableDto = tableService.updateTable(table);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch(IllegalStateException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(tableDto, HttpStatus.OK);
    }

    @PostMapping("/tables")
    public ResponseEntity addTable(@RequestBody TableDto table) {
        try {
            tableService.addTable(table);
        }catch (IllegalArgumentException ex){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        return new ResponseEntity(HttpStatus.OK);
    }


}
