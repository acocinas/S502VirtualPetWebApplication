package com.virtualpet.petapi.mapper;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.model.AccessoryType;
import com.virtualpet.petapi.model.DeveloperType;
import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class PetMapper {

    public PetDTO toDto(Pet pet) {
        return PetDTO.builder()
                .id(pet.getId())
                .name(pet.getName())
                .developerType(pet.getDeveloperType().name())
                .habitatType(pet.getHabitatType().name())
                .accessoryType(pet.getAccessoryType().name())
                .knowledge(pet.getKnowledge())
                .levelKnowledge(pet.getLevelKnowledge())
                .happiness(pet.getHappiness())
                .nutrition(pet.getNutrition())
                .energy(pet.getEnergy())
                .health(pet.getHealth())
                .levelHealth(pet.getLevelHealth())
                .stacks(pet.getStacks())
                .build();
    }

    public Pet toEntity(PetDTO petDTO) {
        return Pet.builder()
                .id(petDTO.getId())
                .name(petDTO.getName())
                .developerType(DeveloperType.valueOf(petDTO.getDeveloperType()))
                .habitatType(HabitatType.valueOf(petDTO.getHabitatType()))
                .accessoryType(AccessoryType.valueOf(petDTO.getAccessoryType()))
                .knowledge(petDTO.getKnowledge())
                .levelKnowledge(petDTO.getLevelKnowledge())
                .happiness(petDTO.getHappiness())
                .nutrition(petDTO.getNutrition())
                .energy(petDTO.getEnergy())
                .health(petDTO.getHealth())
                .levelHealth(petDTO.getLevelHealth())
                .stacks(petDTO.getStacks())
                .build();
    }
}
