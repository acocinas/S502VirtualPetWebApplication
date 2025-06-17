package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.exception.HandleGenericException;
import com.virtualpet.petapi.model.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudyPointsCalculator {

    private final BasePointResolver basePointResolver;

    public int calculateKnowledgePoints(Pet pet, String stack) {
        if (stack == null || stack.isBlank()) {
            throw new HandleGenericException("Stack cannot be null or empty");
        }
        double base = basePointResolver.resolveBasePoints(pet.getDeveloperType(), stack);

        double multiplier = switch (pet.getHabitatType()) {
            case WORKSPACE -> 2.0;
            case REST_ZONE -> 1.2;
            case WELLNESS_ZONE, SOCIAL_ZONE -> 0.5;
        };

        double total = base * multiplier;


        int currentLevel = pet.getLevelKnowledge();
        if (currentLevel < 40) {
            return (int)Math.round(total*2);
        }else if (currentLevel < 70) {
            return (int)Math.round(total * 1.5);
        }else {
            return (int)Math.round(total);
        }
    }
}
