package com.example.mgr;


import com.example.mgr.controllers.MainPageController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
@EnableMongoRepositories
public class MgrApplication implements CommandLineRunner {

    @Autowired
    private MainPageController mainPageController;


    public static void main(String[] args) {
        SpringApplication.run(MgrApplication.class, args);
    }

    @Override
    public void run(String... args)  {
        mainPageController.createItem();
        System.out.println(mainPageController.showAllItems());
    }
}

