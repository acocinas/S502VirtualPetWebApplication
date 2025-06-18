package com.virtualpet.petapi.controller;

import com.virtualpet.petapi.dto.HabitatChangeRequest;
import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.mapper.PetMapper;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.service.habitat.HabitatChangeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/pets")
@RequiredArgsConstructor
public class PetHabitatController {

    private final HabitatChangeService habitatChangeService;
    private final PetMapper petMapper;

    @PatchMapping("/{id}/habitat")
    public ResponseEntity<PetDTO> changeHabitat(
            @PathVariable Long id,
            @RequestBody HabitatChangeRequest request
    ) {
        Pet updatedPet = habitatChangeService.changeHabitat(id, request.getNewHabitat());
        return ResponseEntity.ok(petMapper.toDto(updatedPet));
    }
}
