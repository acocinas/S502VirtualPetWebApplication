package com.virtualpet.petapi.service.habitat;

import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HabitatChangeService {

    private final PetRepository petRepository;

    public Pet changeHabitat(Long petId, HabitatType newHabitat) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(()-> new PetNotFoundException("Pet not found " + petId));
        pet.setHabitatType(newHabitat);
        pet.setEnergy(Math.max(pet.getEnergy() -5, 0));
        return petRepository.save(pet);
    }
}
