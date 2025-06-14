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
                .developerType(pet.getDeveloperType())
                .habitat(pet.getHabitat())
                .knowledge(pet.getKnowledge())
                .levelKnowledge(pet.getLevelKnowledge())
                .happiness(pet.getHappiness())
                .hunger(pet.getHunger())
                .energy(pet.getEnergy())
                .health(pet.getHealth())
                .levelHealth(pet.getLevelHealth())
                .accessory(pet.getAccessory())
                .stacks(pet.getStacks())
                .lastSleep(pet.getLastSleep())
                .build();
    }

    public Pet toEntity(PetDTO petDTO) {
        return Pet.builder()
                .id(petDTO.getId())
                .name(petDTO.getName())
                .developerType(petDTO.getDeveloperType())
                .habitat(petDTO.getHabitat())
                .knowledge(petDTO.getKnowledge())
                .levelKnowledge(petDTO.getLevelKnowledge())
                .happiness(petDTO.getHappiness())
                .hunger(petDTO.getHunger())
                .energy(petDTO.getEnergy())
                .health(petDTO.getHealth())
                .levelHealth(petDTO.getLevelHealth())
                .accessory(petDTO.getAccessory())
                .stacks(petDTO.getStacks())
                .lastSleep(petDTO.getLastSleep())
                .build();
    }
}
