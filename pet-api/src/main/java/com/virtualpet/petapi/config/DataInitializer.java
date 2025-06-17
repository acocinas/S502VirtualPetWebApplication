package com.virtualpet.petapi.config;

import com.virtualpet.petapi.model.*;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initAdminUser() {
        return args -> {
            User admin = userRepository.findByUsername(adminUsername)
                    .orElseGet(() -> {
                        String hashedPassword = passwordEncoder.encode(adminPassword);
                        User newAdmin = new User(null, adminUsername, hashedPassword, "ROLE_ADMIN");
                        userRepository.save(newAdmin);
                        log.info("Admin user created");
                        return newAdmin;
                    });
            log.info("Admin user loaded: {}", admin.getUsername());

            List<Pet> adminPets = petRepository.findByUser(admin);
            if (adminPets.isEmpty()) {
                Pet demoPet = Pet.builder()
                        .name("ChatiBackend")
                        .developerType(DeveloperType.BACKEND)
                        .habitatType(HabitatType.REST_ZONE)
                        .knowledge(0)
                        .levelKnowledge(0)
                        .happiness(50)
                        .energy(100)
                        .user(admin)
                        .build();

                demoPet.setAccessoryType(AccessoryType.DESKTOP);

                petRepository.save(demoPet);
                log.info("🐾 Demo pet created for admin: {}", demoPet.getName());
            } else {
                log.info("🐾 Admin already has {} pets", adminPets.size());
            }
        };
    }
}
