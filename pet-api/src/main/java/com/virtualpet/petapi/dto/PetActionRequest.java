package com.virtualpet.petapi.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
public class PetActionRequest {

    @NotBlank(message = "Action is required")
    private String action;

    private String parameter;
}
