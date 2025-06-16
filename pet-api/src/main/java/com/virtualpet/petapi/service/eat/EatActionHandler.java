package com.virtualpet.petapi.service.eat;

import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.service.actions.PetActionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("eat")
@RequiredArgsConstructor
public class EatActionHandler implements PetActionHandler {

    private final PetRepository petRepository;
    private final EatPointsCalculator energyPointsCalculator;

    @Override
    public Pet execute(Long petId, String parameter) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new PetNotFoundException("Pet not found" + petId));

        energyPointsCalculator.applyEnergyEffects(pet);

        return petRepository.save(pet);
    }
}
