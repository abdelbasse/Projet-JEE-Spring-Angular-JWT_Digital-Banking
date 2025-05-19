package q.jv.digital_banking_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import q.jv.digital_banking_app.entities.BankAccount;
import q.jv.digital_banking_app.entities.Customer;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
}
