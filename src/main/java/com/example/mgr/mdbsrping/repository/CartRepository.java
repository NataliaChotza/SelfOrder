package com.example.mgr.mdbsrping.repository;

import com.example.mgr.mdbspringboot.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart,String> {


}
