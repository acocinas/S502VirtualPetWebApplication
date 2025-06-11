package com.virtualpet.petapi.controller;


import com.virtualpet.petapi.dto.LoginRequest;
import com.virtualpet.petapi.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

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
}
