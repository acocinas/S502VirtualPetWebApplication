package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.model.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudyPointsCalculator {

    private final StackAffinityService stackAffinityService;

    public int calculateKnowledgePoints(Pet pet, String stack) {
        boolean isMainStack = stackAffinityService.isMainStack(pet.getDeveloperType(), stack);
        boolean isIdealHabitat = "office".equalsIgnoreCase(pet.getHabitat());

        int base = isMainStack ? 4:3;
        int bonus = isIdealHabitat ? 2:1;
        int total = base * bonus;

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
