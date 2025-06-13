package com.virtualpet.petapi.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private UserDTO user;
}
