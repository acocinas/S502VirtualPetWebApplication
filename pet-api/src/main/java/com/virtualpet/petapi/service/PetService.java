package com.virtualpet.petapi.service;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.exception.UnauthorizedAccessException;
import com.virtualpet.petapi.mapper.PetMapper;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.security.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PetMapper petMapper;
    private final AuthUtil authUtil;

    public List<PetDTO> getAllPets() {
        if (authUtil.isAdmin()) {
            return petRepository.findAll().stream().map(petMapper::toDto).toList();
        } else {
            var currentUser = authUtil.getCurrentUser();
            return petRepository.findByUser(currentUser).stream().map(petMapper::toDto).toList();
        }
    }

    public PetDTO createPetForUser(PetDTO petDTO, User user) {
        Pet pet = petMapper.toEntity(petDTO);
        pet.setUser(user);
        Pet savedPet = petRepository.save(pet);
        return petMapper.toDto(savedPet);
    }

    public PetDTO updatePet(Long id, PetDTO petDTO) {
        Pet pet = petMapper.toEntity(petDTO);
        pet.setId(id);
        Pet updatedPet = petRepository.save(pet);
        return petMapper.toDto(updatedPet);
    }

    public void deletePet(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Pet not found"));

        User currentUser = authUtil.getCurrentUser();
        if(!authUtil.isAdmin() && !pet.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("You are not authorized to delete this pet");
        } else {
            petRepository.delete(pet);
        }
    }
}
