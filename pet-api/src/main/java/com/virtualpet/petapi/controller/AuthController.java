package com.virtualpet.petapi.controller;


import com.virtualpet.petapi.dto.LoginRequest;
import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.virtualpet.petapi.security.AuthUtil;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthUtil authUtil;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        if ("admin".equalsIgnoreCase(username)){
        if ("admin1234".equals(password)) {
            return ResponseEntity.ok(jwtUtil.generateToken(username, "ROLE_ADMIN"));
        }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials for admin");

    }
        if (password != null && !password.isBlank()) {
            return ResponseEntity.ok(jwtUtil.generateToken(username, "ROLE_USER"));
        }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(authUtil.getCurrentUser());
    }
}
