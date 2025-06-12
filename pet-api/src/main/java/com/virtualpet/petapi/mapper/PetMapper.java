package com.virtualpet.petapi.mapper;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class PetMapper {

    public PetDTO toDto(Pet pet) {
        return PetDTO.builder()
                .id(pet.getId())
                .name(pet.getName())
                .type(pet.getType())
                .mood(pet.getMood())
                .energy(pet.getEnergy())
                .environment(pet.getEnvironment())
                .build();
    }

    public Pet toEntity(PetDTO petDTO) {
        return Pet.builder()
                .id(petDTO.getId())
                .name(petDTO.getName())
                .type(petDTO.getType())
                .mood(petDTO.getMood())
                .energy(petDTO.getEnergy())
                .environment(petDTO.getEnvironment())
                .build();
    }
}
