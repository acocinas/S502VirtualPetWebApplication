package com.virtualpet.petapi.service.sleep;

import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class SleepPointsCalculator {

    public void applySleepEffects(Pet pet) {
        int baseRecovery = 10;

        if (pet.getEnergy() < 40) {
            baseRecovery += 2;
        } else if (pet.getEnergy() > 80) {
            baseRecovery -= 2;
        }

        double multiplier = switch (pet.getHabitatType()) {
            case REST_ZONE -> 2.0;
            case WELLNESS_ZONE -> 1.0;
            case WORKSPACE, SOCIAL_ZONE -> 0.5;
        };

        int finalRecovery = (int) Math.round(baseRecovery * multiplier);

        pet.setEnergy(Math.min(pet.getEnergy() + finalRecovery, 100));
        pet.setHappiness(Math.min(pet.getHappiness() + 3, 100));
    }
}