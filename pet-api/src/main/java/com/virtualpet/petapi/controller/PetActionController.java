package com.virtualpet.petapi.controller;

import com.virtualpet.petapi.dto.PetActionRequest;
import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.mapper.PetMapper;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.service.actions.PetActionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pets")
@RequiredArgsConstructor
public class PetActionController {

    private final PetActionService petActionService;
    private final PetMapper petMapper;

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
