package com.virtualpet.petapi.service.eat;

import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EatPointsCalculatorTest {

    private final EatPointsCalculator calculator = new EatPointsCalculator();

    @Test
    void applyEnergyEffects_shouldIncreaseEnergyAndHappiness() {
        Pet pet = new Pet();
        pet.setEnergy(30);  // baja energía
        pet.setHappiness(50);
        pet.setHabitatType(HabitatType.REST_ZONE); // habitat con bonificación

        calculator.applyEnergyEffects(pet);

        // Valor esperado: 10 base + 2 (por energía baja) = 12
        // multiplicador 1.2 → 12 * 1.2 = 14.4 → redondeado 14
        // nueva energía: 30 + 14 = 44
        // nueva felicidad: 50 + 2 = 52
        assertEquals(44, pet.getEnergy());
        assertEquals(52, pet.getHappiness());
    }
}

