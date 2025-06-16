package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.exception.HandleGenericException;
import com.virtualpet.petapi.model.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudyPointsCalculator {

    private final StackAffinityService stackAffinityService;

    public int calculateKnowledgePoints(Pet pet, String stack) {
        if (stack == null || stack.isBlank()) {
            throw new HandleGenericException("Stack cannot be null or empty");
        }
        boolean isMainStack = stackAffinityService.isMainStack(pet.getDeveloperType(), stack);
        boolean isCommonStack = stackAffinityService.isCommonStack(stack);

        if (!isMainStack && !isCommonStack) {
            throw new HandleGenericException("Invalid stack: " + stack);
        }

        int base = isMainStack ? 4:3;

        double multiplier = switch (pet.getHabitatType()) {
            case WORKSPACE -> 2.0;
            case REST_ZONE -> 1.0;
            case WELLNESS_ZONE, SOCIAL_ZONE -> 0.5;
        };

        int total = (int) Math.round(base * multiplier);

        int currentLevel = pet.getLevelKnowledge();
        if (currentLevel < 40) {
            return total*2;
        }else if (currentLevel < 70) {
            return (int)Math.round(total * 1.5);
        }else {
            return total;
        }
    }
}
