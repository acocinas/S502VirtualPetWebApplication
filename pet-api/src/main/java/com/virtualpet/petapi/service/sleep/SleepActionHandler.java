package com.virtualpet.petapi.service.sleep;

import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.service.actions.PetActionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("sleep")
@RequiredArgsConstructor
public class SleepActionHandler implements PetActionHandler {

    private final PetRepository petRepository;
    private final SleepPointsCalculator sleepPointsCalculator;

    @Override
    public Pet execute(Long petId, String parameter) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new PetNotFoundException("Pet not found"+ petId));
        sleepPointsCalculator.applySleepEffects(pet);
        return petRepository.save(pet);
    }

}
