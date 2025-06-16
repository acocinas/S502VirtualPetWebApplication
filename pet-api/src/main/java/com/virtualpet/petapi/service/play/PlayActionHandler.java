package com.virtualpet.petapi.service.play;

import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.service.actions.PetActionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("play")
@RequiredArgsConstructor
public class PlayActionHandler implements PetActionHandler {

    private final PetRepository petRepository;
    private final PlayPointsCalculator playPointsCalculator;

    @Override
    public Pet execute(Long petId, String parameter){
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new PetNotFoundException("Pet not found " + petId));

        playPointsCalculator.applyPlayEffects(pet);

        return petRepository.save(pet);
    }
}
