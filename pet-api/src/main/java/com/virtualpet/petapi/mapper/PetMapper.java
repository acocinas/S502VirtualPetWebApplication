package com.virtualpet.petapi.mapper;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.dto.StackProgress;
import com.virtualpet.petapi.model.AccessoryType;
import com.virtualpet.petapi.model.DeveloperType;
import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PetMapper {

    public PetDTO toDto(Pet pet) {
        return PetDTO.builder()
                .id(pet.getId())
                .name(pet.getName())
                .developerType(pet.getDeveloperType() != null ? pet.getDeveloperType().name() : null)
                .habitatType(pet.getHabitatType() != null ? pet.getHabitatType().name() : null)
                .accessoryType(pet.getAccessoryType() != null ? pet.getAccessoryType().name() : null)
                .knowledge(pet.getKnowledge())
                .levelKnowledge(pet.getLevelKnowledge())
                .happiness(pet.getHappiness())
                .energy(pet.getEnergy())
                .stacks(pet.getStackPoints() != null ?
                        pet.getStackPoints().entrySet().stream()
                                .map(entry -> new StackProgress(entry.getKey(), entry.getValue()))
                                .toList()
                        : List.of())
                .ownerUsername(pet.getUser() != null ? pet.getUser().getUsername() : null)
                .build();
    }

    public Pet toEntity(PetDTO petDTO) {
        Pet pet = Pet.builder()
                .id(petDTO.getId())
                .name(petDTO.getName())
                .developerType(DeveloperType.valueOf(petDTO.getDeveloperType()))
                .habitatType(HabitatType.REST_ZONE)
                .accessoryType(AccessoryType.DESKTOP)
                .knowledge(0)
                .levelKnowledge(0)
                .happiness(50)
                .energy(100)
                .build();
        if (petDTO.getStacks() != null) {
            pet.setStackPoints(
                    petDTO.getStacks().stream()
                            .collect(Collectors.toMap(StackProgress::getStackName, StackProgress::getStudyPoints))
            );
        }
        return pet;
    }
}
