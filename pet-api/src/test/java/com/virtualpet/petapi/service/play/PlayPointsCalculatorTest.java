package com.virtualpet.petapi.service.play;

import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PlayPointsCalculatorTest {

    private final PlayPointsCalculator calculator = new PlayPointsCalculator();

    @Test
    void applyPlayEffects_shouldIncreaseHappinessAndReduceEnergy() {
        Pet pet = new Pet();
        pet.setEnergy(50);
        pet.setHappiness(60);
        pet.setHabitatType(HabitatType.SOCIAL_ZONE); // multiplicador 2.0

        calculator.applyPlayEffects(pet);

        // base felicidad: 10 * 2.0 = 20 → felicidad 60 + 20 = 80
        // energía 50 - 5 = 45
        assertEquals(80, pet.getHappiness());
        assertEquals(45, pet.getEnergy());
    }
}
