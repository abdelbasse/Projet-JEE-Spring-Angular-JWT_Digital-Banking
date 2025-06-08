package org.example.e_banking_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.example.e_banking_backend.entities.Customer;

import java.util.Date;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("select c from Customer c where c.name like :kw")
    List<Customer> searchCustomer(@Param("kw") String keyword);

    // For Dashboard
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.createdAt < :date")
    long countCustomersBeforeDate(@Param("date") Date date);

}
