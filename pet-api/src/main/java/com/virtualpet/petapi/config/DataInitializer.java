package com.virtualpet.petapi.config;

import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initAdminUser(){
        return args -> {
            if (userRepository.findByUsername(adminUsername).isEmpty()){
                String hashedPassword = passwordEncoder.encode(adminPassword);
                User admin = new User(null, "admin", hashedPassword,"ROLE_ADMIN");
                userRepository.save(admin);
                log.info("Admin created with encoded password");
            } else {
            log.info("Admin exist");
            }
        };
    }
}
