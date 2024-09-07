package com.example.mgr.mdbsrping.repository;

import com.example.mgr.mdbspringboot.model.Table;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TableRepository extends MongoRepository<Table,String> {

    Optional<Table> findByTableNumber(String tableNumber);
}
