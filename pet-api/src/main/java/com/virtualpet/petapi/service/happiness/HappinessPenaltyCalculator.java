package com.virtualpet.petapi.service.happiness;

import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class HappinessPenaltyCalculator {

    public int calculatePenaltyPoints(Pet pet) {
        int level = pet.getLevelKnowledge();
        int knowledge = pet.getKnowledge();
        int energy = pet.getEnergy();

        int base = basePenalty(level, knowledge);
        return applyEnergyMultiplier(base, energy);
    }

    private int basePenalty(int level, int knowledge) {
        int penalty = switch (level) {
            case 0 -> 10;
            case 1 -> 9;
            case 2 -> 8;
            case 3 -> 7;
            default -> 6;
        };

        if (knowledge >= 80) penalty -= 2;
        else if (knowledge >= 60) penalty -= 1;

        return Math.max(penalty, 1);
    }

    private int applyEnergyMultiplier(int penalty, int energy) {
        if (energy >= 70) return penalty;
        else if (energy >= 40) return penalty * 2;
        else return penalty * 3;
    }
}
