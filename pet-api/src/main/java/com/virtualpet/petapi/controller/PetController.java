package com.virtualpet.petapi.controller;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.security.AuthUtil;
import com.virtualpet.petapi.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;
    private final AuthUtil authUtil;

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
}
