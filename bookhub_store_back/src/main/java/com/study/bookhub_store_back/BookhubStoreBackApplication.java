package com.study.bookhub_store_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BookhubStoreBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookhubStoreBackApplication.class, args);
    }

}
