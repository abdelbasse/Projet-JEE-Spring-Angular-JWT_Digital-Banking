package org.example.e_banking_backend.repositories;

import org.example.e_banking_backend.enums.OperationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.e_banking_backend.entities.AccountOperation;
import org.example.e_banking_backend.entities.BankAccount;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
    List<AccountOperation> findByBankAccountId(String accountId);
    Page<AccountOperation> findByBankAccountIdOrderByOperationDateDesc(String accountId, Pageable pageable);

    long countByType(OperationType type);
    List<AccountOperation> findTop5ByOrderByOperationDateDesc();
    // Add @Query annotation for the custom query
    @Query("SELECT SUM(op.amount) FROM AccountOperation op WHERE MONTH(op.operationDate) = :month")
    Double sumAmountByMonth(@Param("month") int month);

}
