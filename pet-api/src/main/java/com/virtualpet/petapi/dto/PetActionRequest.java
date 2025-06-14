package com.virtualpet.petapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
public class PetActionRequest {

    @NotNull(message = "Pet ID cannot be null")
    private Long petId;
    @NotBlank(message = "Action is required")
    private String action;

    private String parameter;
}
