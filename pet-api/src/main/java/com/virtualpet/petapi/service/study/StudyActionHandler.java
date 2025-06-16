package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.service.actions.PetActionHandler;
import com.virtualpet.petapi.service.happiness.HappinessPenaltyCalculator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("study")
@RequiredArgsConstructor
public class StudyActionHandler implements PetActionHandler {

    private final PetRepository petRepository;
    private final StudyPointsCalculator studyPointsCalculator;
    private final HappinessPenaltyCalculator happinessPenaltyCalculator;

    @Override
    @Transactional
    public Pet execute(Long petId, String stack) {

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new PetNotFoundException("Pet not found"));

        int points = studyPointsCalculator.calculateKnowledgePoints(pet, stack);
        pet.setKnowledge(pet.getKnowledge() + points);
        pet.setEnergy(Math.max(pet.getEnergy() - 10, 0));

        int penalty = happinessPenaltyCalculator.calculatePenaltyPoints(pet);
        pet.setHappiness(Math.max(pet.getHappiness() - penalty, 0));

        if (pet.getKnowledge() >= 100) {
            pet.setLevelKnowledge(pet.getLevelKnowledge() + 1);
            pet.setKnowledge(0);
            improveAccessory(pet);
        }
        return petRepository.save(pet);
    }

    private void improveAccessory(Pet pet) {
        pet.setAccessoryType(pet.getAccessoryType().getNextLevel());
    }
}
