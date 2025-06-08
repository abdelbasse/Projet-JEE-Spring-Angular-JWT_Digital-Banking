package org.example.e_banking_backend.web;

import org.example.e_banking_backend.dtos.CreateUserDTO;
import org.example.e_banking_backend.dtos.ResetPasswordDTO;
import org.example.e_banking_backend.entities.AppUser;
import org.example.e_banking_backend.services.UserAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    private final UserAuthService userAuthService;

    public UserRestController(UserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<AppUser> createUser(@RequestBody CreateUserDTO createUserDTO) {
        AppUser user = userAuthService.createUser(
                createUserDTO.username(),
                createUserDTO.password(),
                createUserDTO.roles()
        );
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{username}/reset-password")
    public ResponseEntity<String> resetPassword(
            @PathVariable String username,
            @RequestBody ResetPasswordDTO dto) {
        userAuthService.resetPassword(username, dto.newPassword());
        return ResponseEntity.ok("Password reset successfully");
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        userAuthService.deleteUser(username);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        return ResponseEntity.ok(userAuthService.getAllUsers());
    }
}