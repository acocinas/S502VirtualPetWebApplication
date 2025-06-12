package com.virtualpet.petapi.dto;

import lombok.*;

@Data
@Builder
public class PetDTO {

    private Long id;
    private String name;
    private String type;
    private String mood;
    private int energy;
    private String environment;
}
