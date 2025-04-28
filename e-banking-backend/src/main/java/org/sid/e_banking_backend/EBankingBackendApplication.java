package org.sid.e_banking_backend;

import org.sid.e_banking_backend.entities.AccountOperation;
import org.sid.e_banking_backend.entities.CurrentAccount;
import org.sid.e_banking_backend.entities.Customer;
import org.sid.e_banking_backend.entities.SavingAccount;
import org.sid.e_banking_backend.enums.AccountStatus;
import org.sid.e_banking_backend.enums.OperationType;
import org.sid.e_banking_backend.repo.AccountOperationRepo;
import org.sid.e_banking_backend.repo.BankAccountRepo;
import org.sid.e_banking_backend.repo.CustomerRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.rmi.server.UID;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class EBankingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EBankingBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner start(CustomerRepo customerRepo, BankAccountRepo bankAccountRepo, AccountOperationRepo accountOperationRepo){
		return arg -> {
			Stream.of("Hassan","Yassin","Aicha").forEach(name->{
				Customer customer = new Customer();
				customer.setNom(name);
				customer.setEmail(name + "@gmail.com");
				customerRepo.save(customer);
			});
			customerRepo.findAll().forEach(cust->{
				CurrentAccount currentAccount = new CurrentAccount();
				currentAccount.setId(UUID.randomUUID().toString());
				currentAccount.setBalance(Math.random()*90000);
				currentAccount.setCreatedAt(new Date());
				currentAccount.setStatus(AccountStatus.CREATED);
				currentAccount.setCustomer(cust);
				currentAccount.setOverDraft(9000);
				bankAccountRepo.save(currentAccount);

				SavingAccount savingAccount = new SavingAccount();
				savingAccount.setId(UUID.randomUUID().toString());
				savingAccount.setBalance(Math.random()*90000);
				savingAccount.setCreatedAt(new Date());
				savingAccount.setStatus(AccountStatus.CREATED);
				savingAccount.setCustomer(cust);
				savingAccount.setInterestRate(5.5);
				bankAccountRepo.save(savingAccount);
			});

			bankAccountRepo.findAll().forEach(acc->{
				for (int i =0;i<10;i++){
					AccountOperation accountOperation = new AccountOperation();
					accountOperation.setOperationDate(new Date());
					accountOperation.setAmount(Math.random()*12000);
					accountOperation.setType(Math.random()>0.5? OperationType.DEBIT:OperationType.CREDIT);
					accountOperation.setBankAccount(acc);
					accountOperationRepo.save(accountOperation);
				}
			});
		};
	}
}
