package com.virtualpet.petapi.controller;


import com.virtualpet.petapi.dto.LoginRequest;
import com.virtualpet.petapi.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        if ("testuser".equals(request.getUsername()) && "1234".equals(request.getPassword())) {
            return jwtUtil.generateToken(request.getUsername());
        } else {
            throw new RuntimeException("Bad credentials");
        }

    }
}
