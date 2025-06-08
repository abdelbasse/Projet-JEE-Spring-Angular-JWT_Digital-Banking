package org.example.e_banking_backend.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.example.e_banking_backend.dtos.AccountOperationDTO;
import org.example.e_banking_backend.dtos.CurrentBankAccountDTO;
import org.example.e_banking_backend.dtos.CustomerDTO;
import org.example.e_banking_backend.dtos.SavingBankAccountDTO;
import org.example.e_banking_backend.entities.AccountOperation;
import org.example.e_banking_backend.entities.CurrentAccount;
import org.example.e_banking_backend.entities.Customer;
import org.example.e_banking_backend.entities.SavingAccount;

@Service
public class BankAccountMapperImpl {
    public CustomerDTO fromCustomer(Customer customer){
        CustomerDTO customerDTO=new CustomerDTO();
        BeanUtils.copyProperties(customer,customerDTO);
        return  customerDTO;
    }
    public Customer fromCustomerDTO(CustomerDTO customerDTO){
        Customer customer = new Customer();
        if (customerDTO.getId() != null) {
            customer.setId(customerDTO.getId());
        }
        customer.setName(customerDTO.getName());
        customer.setEmail(customerDTO.getEmail());
        return customer;
    }

    public SavingBankAccountDTO fromSavingBankAccount(SavingAccount savingAccount){
        SavingBankAccountDTO dto = new SavingBankAccountDTO();
        BeanUtils.copyProperties(savingAccount, dto);
        dto.setCustomerDTO(fromCustomer(savingAccount.getCustomer()));
        dto.setType(savingAccount.getClass().getSimpleName());
        System.out.println("Mapped SavingAccount to DTO: " + dto);
        return dto;
    }

    public SavingAccount fromSavingBankAccountDTO(SavingBankAccountDTO savingBankAccountDTO){
        SavingAccount savingAccount=new SavingAccount();
        BeanUtils.copyProperties(savingBankAccountDTO,savingAccount);
        savingAccount.setCustomer(fromCustomerDTO(savingBankAccountDTO.getCustomerDTO()));
        return savingAccount;
    }

    public CurrentBankAccountDTO fromCurrentBankAccount(CurrentAccount currentAccount){
        CurrentBankAccountDTO dto = new CurrentBankAccountDTO();
        BeanUtils.copyProperties(currentAccount, dto);
        dto.setCustomerDTO(fromCustomer(currentAccount.getCustomer()));
        dto.setType(currentAccount.getClass().getSimpleName());
        System.out.println("Mapped CurrentAccount to DTO: " + dto);
        return dto;
    }

    public CurrentAccount fromCurrentBankAccountDTO(CurrentBankAccountDTO currentBankAccountDTO){
        CurrentAccount currentAccount=new CurrentAccount();
        BeanUtils.copyProperties(currentBankAccountDTO,currentAccount);
        currentAccount.setCustomer(fromCustomerDTO(currentBankAccountDTO.getCustomerDTO()));
        return currentAccount;
    }

    public AccountOperationDTO fromAccountOperation(AccountOperation accountOperation){
        AccountOperationDTO accountOperationDTO=new AccountOperationDTO();
        BeanUtils.copyProperties(accountOperation,accountOperationDTO);
        return accountOperationDTO;
    }

}
