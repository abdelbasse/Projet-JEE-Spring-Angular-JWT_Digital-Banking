package q.jv.digital_banking_app.dtos;

import lombok.Data;
import q.jv.digital_banking_app.enums.AccountStatus;

import java.util.Date;

@Data
public class CurrentBankAccountDTO  extends BankAccountDTO {
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDTO customerDTO;
    private double overDraft;
}
