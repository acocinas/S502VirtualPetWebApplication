package com.virtualpet.petapi.service.play;

import com.virtualpet.petapi.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class PlayPointsCalculator {

    public void applyPlayEffects(Pet pet) {
        int baseHappiness = 10;

        double multiplier = switch (pet.getHabitatType()){
            case SOCIAL_ZONE -> 2.0;
            case REST_ZONE, WELLNESS_ZONE -> 1.0;
            case WORKSPACE -> 0.5;
        };
        int finalHappiness = (int) Math.round(baseHappiness*multiplier);

        pet.setHappiness(Math.min(pet.getHappiness() + finalHappiness, 100 ));
        pet.setEnergy(Math.max(pet.getEnergy() -5, 0));
    }
}
