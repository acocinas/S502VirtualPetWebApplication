package com.virtualpet.petapi.controller;


import com.virtualpet.petapi.dto.LoginRequest;
import com.virtualpet.petapi.dto.LoginResponseDTO;
import com.virtualpet.petapi.dto.UserDTO;
import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.security.JwtUtil;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.virtualpet.petapi.security.AuthUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.virtualpet.petapi.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request){
        String username = request.getUsername();
        String password = request.getPassword();

        if(userRepository.findByUsername(username).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username already exists");
        }
        User newUser = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .role("ROLE_USER")
                .build();
        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully " + username);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                UserDTO userDTO = new UserDTO(user.getUsername(), user.getRole());
                return ResponseEntity.ok(new LoginResponseDTO(token, userDTO));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        User user = authUtil.getCurrentUser();
        UserDTO userDTO = new UserDTO(user.getUsername(), user.getRole());
        return ResponseEntity.ok(userDTO);
    }
}
