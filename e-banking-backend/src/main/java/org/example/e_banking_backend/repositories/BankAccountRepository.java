package org.example.e_banking_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.e_banking_backend.entities.BankAccount;
import org.example.e_banking_backend.entities.Customer;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> { }

