package org.sid.e_banking_backend.repo;

import org.sid.e_banking_backend.entities.AccountOperation;
import org.sid.e_banking_backend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountOperationRepo extends JpaRepository<AccountOperation,Long> {
}
