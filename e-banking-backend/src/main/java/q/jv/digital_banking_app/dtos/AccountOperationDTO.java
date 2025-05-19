package q.jv.digital_banking_app.dtos;

import lombok.Data;
import q.jv.digital_banking_app.enums.OperationType;

import java.util.Date;

@Data
public class AccountOperationDTO {
    private Long id;
    private Date operationDate;
    private double amount;
    private OperationType type;
    private String description;
}
