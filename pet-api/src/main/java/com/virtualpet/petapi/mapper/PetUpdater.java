package com.virtualpet.petapi.mapper;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.dto.StackProgress;
import com.virtualpet.petapi.model.*;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PetUpdater {

    public Pet applyUpdates(Pet existingPet, PetDTO dto) {
        if (dto.getName() != null) existingPet.setName(dto.getName());
        if (dto.getDeveloperType() != null) {
            existingPet.setDeveloperType(DeveloperType.valueOf(dto.getDeveloperType()));
        }
        if (dto.getHabitatType() != null) {
            existingPet.setHabitatType(HabitatType.valueOf(dto.getHabitatType()));
        }
        if (dto.getAccessoryType() != null) {
            existingPet.setAccessoryType(AccessoryType.valueOf(dto.getAccessoryType()));
        }
        if (dto.getStacks() != null) {
            existingPet.setStackPoints(
                    dto.getStacks().stream()
                            .collect(Collectors.toMap(StackProgress::getStackName, StackProgress::getStudyPoints))
            );
        }

        if (dto.getEnergy() != null) existingPet.setEnergy(dto.getEnergy());
        if (dto.getHappiness() != null) existingPet.setHappiness(dto.getHappiness());
        if (dto.getKnowledge() != null) existingPet.setKnowledge(dto.getKnowledge());
        if (dto.getLevelKnowledge() != null) existingPet.setLevelKnowledge(dto.getLevelKnowledge());

        return existingPet;
    }
}
