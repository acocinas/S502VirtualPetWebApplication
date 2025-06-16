package com.virtualpet.petapi.controller;

import com.virtualpet.petapi.dto.PetActionRequest;
import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.security.AuthUtil;
import com.virtualpet.petapi.service.PetService;
import com.virtualpet.petapi.service.actions.PetActionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.virtualpet.petapi.mapper.PetMapper;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;
    private final AuthUtil authUtil;
    private final PetMapper petMapper;
    private final PetActionService petActionService;

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @PostMapping
    public ResponseEntity<PetDTO> createPet(@RequestBody PetDTO petDTO) {
        User currentUser = authUtil.getCurrentUser();
        PetDTO createdPet = petService.createPetForUser(petDTO, currentUser);
        return ResponseEntity.ok(createdPet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable Long id, @RequestBody PetDTO petDTO) {
        return ResponseEntity.ok(petService.updatePet(id, petDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/action")
    public ResponseEntity<PetDTO> performAction(
            @PathVariable Long id,
            @RequestBody @Valid PetActionRequest request
    ) {
        Pet pet = petActionService.performAction(request.getAction(), id, request.getParameter());
        PetDTO updated = petMapper.toDto(pet);
        return ResponseEntity.ok(updated);
    }

}
