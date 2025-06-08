package org.example.e_banking_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.e_banking_backend.entities.BankAccount;
import org.example.e_banking_backend.entities.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    @Query("SELECT COUNT(b) FROM BankAccount b WHERE TYPE(b) = :type")
    long countByType(@Param("type") Class<? extends BankAccount> type);

//    // Or if you want to use the discriminator value directly:
//    @Query("SELECT COUNT(b) FROM BankAccount b WHERE b.TYPE = :type")
//    long countByType(@Param("type") String type);

    // The sumBalanceSnapshot method also needs fixing as it references a non-existent field
    @Query("SELECT SUM(b.balance) FROM BankAccount b WHERE b.customer.id = :customerId")
    double sumBalanceByCustomer(@Param("customerId") Long customerId);
}


