package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.model.DeveloperType;
import com.virtualpet.petapi.model.HabitatType;
import com.virtualpet.petapi.model.Pet;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class StudyPointsCalculatorTest {

    @Test
    void calculateKnowledgePoints_shouldReturnPositiveValue() {
        BasePointResolver resolver = mock(BasePointResolver.class);
        when(resolver.resolveBasePoints(any(), any())).thenReturn(10.0);

        StudyPointsCalculator calculator = new StudyPointsCalculator(resolver);

        Pet pet = new Pet();
        pet.setDeveloperType(DeveloperType.BACKEND);
        pet.setHabitatType(HabitatType.WORKSPACE);
        pet.setLevelKnowledge(30);

        int points = calculator.calculateKnowledgePoints(pet, "Java");

        assertTrue(points > 0);
    }
}
