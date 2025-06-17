package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.exception.HandleGenericException;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.service.happiness.HappinessPenaltyCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudyPreconditionsValidator {

    private final HappinessPenaltyCalculator happinessPenaltyCalculator;

    public void validateCanStudy(Pet pet) {
        if (pet.getEnergy() < 10) {
            throw new HandleGenericException("Not enough energy to study. Minimum required: 10");
        }

        int penalty = happinessPenaltyCalculator.calculatePenaltyPoints(pet);
        if (pet.getHappiness() < penalty) {
            throw new HandleGenericException("Not enough happiness to study. Required at least: " + penalty);
        }
    }
}
