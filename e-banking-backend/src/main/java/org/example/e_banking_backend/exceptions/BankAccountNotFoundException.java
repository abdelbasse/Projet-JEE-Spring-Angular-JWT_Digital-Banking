package org.example.e_banking_backend.exceptions;

public class BankAccountNotFoundException extends Exception {
  public BankAccountNotFoundException(String message) {
    super(message);
  }
}
