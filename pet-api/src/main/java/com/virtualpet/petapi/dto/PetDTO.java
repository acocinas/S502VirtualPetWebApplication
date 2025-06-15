package com.virtualpet.petapi.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class PetDTO {
    private Long id;
    private String name;
    private String developerType;
    private String habitatType;
    private String accessoryType;

    private int knowledge;
    private int levelKnowledge;
    private int happiness;
    private int nutrition;
    private int energy;
    private int health;
    private int levelHealth;

    private List<String> stacks;
}
