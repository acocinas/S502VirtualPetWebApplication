package com.virtualpet.petapi.dto;

import lombok.*;

@Data
@NoArgsConstructor @AllArgsConstructor
public class UserDTO {
    private String username;
    private String role;
}
