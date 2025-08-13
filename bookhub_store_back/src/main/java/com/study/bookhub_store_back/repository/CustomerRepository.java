package com.study.bookhub_store_back.repository;

import com.study.bookhub_store_back.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findBySocialIdAndSocialProvider(String socialId, String provider);
}
