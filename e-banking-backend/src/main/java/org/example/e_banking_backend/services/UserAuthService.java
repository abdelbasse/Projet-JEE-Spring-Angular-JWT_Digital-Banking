package org.example.e_banking_backend.services;

import org.example.e_banking_backend.entities.AppRole;
import org.example.e_banking_backend.entities.AppUser;
import org.example.e_banking_backend.repositories.AppRoleRepository;
import org.example.e_banking_backend.repositories.AppUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserAuthService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final AppRoleRepository appRoleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAuthService(AppUserRepository appUserRepository,
                           AppRoleRepository appRoleRepository,
                           PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.appRoleRepository = appRoleRepository;
        this.passwordEncoder = passwordEncoder;
        initRolesAndUsers();
    }

    private void initRolesAndUsers() {
        // Initialize roles
        if (appRoleRepository.count() == 0) {
            appRoleRepository.save(new AppRole(null, "USER"));
            appRoleRepository.save(new AppRole(null, "ADMIN"));
        }

        // Initialize admin user with BOTH roles
        if (!appUserRepository.existsById("admin")) {
            AppUser admin = new AppUser();
            admin.setUserId("admin");
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("12345")); // Use your desired password

            // Add both roles
            admin.getRoles().add(appRoleRepository.findByRoleName("USER"));
            admin.getRoles().add(appRoleRepository.findByRoleName("ADMIN"));

            appUserRepository.save(admin);
        }

        // Initialize regular user (optional)
        if (!appUserRepository.existsById("user")) {
            AppUser user = new AppUser();
            user.setUserId("user");
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("12345"));
            user.getRoles().add(appRoleRepository.findByRoleName("USER"));
            appUserRepository.save(user);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username);
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found");
        }

        List<SimpleGrantedAuthority> authorities = appUser.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());

        return new User(appUser.getUsername(), appUser.getPassword(), authorities);
    }

    public AppUser createUser(String username, String password, String... roleNames) {
        if (appUserRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("User already exists");
        }

        AppUser user = new AppUser();
        user.setUserId(username); // Using username as ID for simplicity
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));

        for (String roleName : roleNames) {
            AppRole role = appRoleRepository.findByRoleName(roleName);
            if (role != null) {
                user.getRoles().add(role);
            }
        }

        return appUserRepository.save(user);
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        appUserRepository.save(user);
    }

    public void deleteUser(String username) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        appUserRepository.delete(user);
    }

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }
}