package com.virtualpet.petapi.controller;

import com.virtualpet.petapi.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/check-secret")
    public String getSecret() {
        return jwtUtil.generateToken("testuser");
    }
}
