package com.virtualpet.petapi.dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
