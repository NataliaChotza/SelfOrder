package com.example.mgr.mdbsrping.repository;

import com.example.mgr.mdbspringboot.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ItemRepository extends MongoRepository<Item,String> {


    Item findItemByName(String name);




}
