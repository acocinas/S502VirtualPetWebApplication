package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.exception.HandleGenericException;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.service.happiness.HappinessPenaltyCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class StudyPreconditionsValidator {

    private final HappinessPenaltyCalculator happinessPenaltyCalculator;

    public void validateCanStudy(Pet pet) {
        int penalty = happinessPenaltyCalculator.calculatePenaltyPoints(pet);
        if ((pet.getEnergy() < 10) || (pet.getHappiness() < penalty)){
            log.info("Lanzando excepción por falta de felicidad");
            throw new HandleGenericException("No se cumplen las condiciones para estudiar");
        }
    }
}
