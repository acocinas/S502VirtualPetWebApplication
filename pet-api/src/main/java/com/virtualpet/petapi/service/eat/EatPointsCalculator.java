package com.virtualpet.petapi.service.eat;

import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class EatPointsCalculator {

    public void applyEnergyEffects(Pet pet) {
        int baseRecovery = 10;

        if (pet.getEnergy() < 40) baseRecovery += 2;
        if (pet.getEnergy() > 80) baseRecovery -= 2;

        double multiplier = switch (pet.getHabitatType()) {
            case WELLNESS_ZONE -> 0.8;
            case WORKSPACE -> 0.5;
            case REST_ZONE, SOCIAL_ZONE -> 1.2;
        };

        int finalPoints = (int) Math.round(baseRecovery * multiplier);

        pet.setEnergy(Math.min(pet.getEnergy() + finalPoints, 100));
        pet.setHappiness(Math.min(pet.getHappiness() +2, 100));
    }
}
