package com.virtualpet.petapi.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PetDTO {
    private Long id;
    private String name;

    private String developerType;
    private String habitat;

    private int knowledge;
    private int levelKnowledge;
    private int happiness;
    private int hunger;
    private int energy;
    private int health;
    private int levelHealth;

    private String accessory;
    private List<String> stacks;
    private LocalDateTime lastSleep;
}
