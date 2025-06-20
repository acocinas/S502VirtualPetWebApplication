package com.virtualpet.petapi.service.sleep;

import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SleepPointsCalculatorTest {

    private final SleepPointsCalculator calculator = new SleepPointsCalculator();

    @Test
    void applySleepEffects_shouldIncreaseEnergyAndHappiness() {
        Pet pet = new Pet();
        pet.setEnergy(30);  // energía baja
        pet.setHappiness(40);
        pet.setHabitatType(HabitatType.REST_ZONE);  // máximo multiplicador

        calculator.applySleepEffects(pet);

        // base: 10 + 2 = 12 → *2 = 24 → energía: 30 + 24 = 54
        // felicidad: 40 + 3 = 43
        assertEquals(54, pet.getEnergy());
        assertEquals(43, pet.getHappiness());
    }
}
