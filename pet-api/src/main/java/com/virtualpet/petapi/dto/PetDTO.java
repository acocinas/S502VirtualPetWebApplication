package com.virtualpet.petapi.dto;

import lombok.*;
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
    private int energy;

    private List<StackProgress> stacks;

}
