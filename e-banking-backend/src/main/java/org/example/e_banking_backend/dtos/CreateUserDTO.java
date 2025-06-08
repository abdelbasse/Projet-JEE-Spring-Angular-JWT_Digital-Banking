package org.example.e_banking_backend.dtos;

public record CreateUserDTO(String username, String password, String[] roles) {
}