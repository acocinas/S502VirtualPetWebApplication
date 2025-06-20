package com.virtualpet.petapi.service;

import com.virtualpet.petapi.dto.PetDTO;
import com.virtualpet.petapi.exception.PetAlreadyExistsException;
import com.virtualpet.petapi.exception.PetNotFoundException;
import com.virtualpet.petapi.exception.UnauthorizedAccessException;
import com.virtualpet.petapi.mapper.PetMapper;
import com.virtualpet.petapi.mapper.PetUpdater;
import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.model.User;
import com.virtualpet.petapi.repository.PetRepository;
import com.virtualpet.petapi.repository.custom.PetQueryRepository;
import com.virtualpet.petapi.security.AuthUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PetQueryRepository petQueryRepository;
    private final PetMapper petMapper;
    private final AuthUtil authUtil;
    private final PetUpdater petUpdater;

    public List<PetDTO> getAllPets() {
        if (authUtil.isAdmin()) {
            return petRepository.findAll().stream().map(petMapper::toDto).toList();
        } else {
            var currentUser = authUtil.getCurrentUser();
            return petRepository.findByUser(currentUser).stream().map(petMapper::toDto).toList();
        }
    }

    public PetDTO createPetForUser(PetDTO petDTO, User user) {
        log.info("Creating pet for user: {}", user.getUsername());
        log.debug("Received DTO: {}", petDTO);
        if (petQueryRepository.existsByNameForUser(petDTO.getName(), user)) {
            throw new PetAlreadyExistsException("You already have a pet with the name: " + petDTO.getName());
        }
        Pet pet = petMapper.toEntity(petDTO);
        pet.setUser(user);
        Pet savedPet = petRepository.save(pet);
        return petMapper.toDto(savedPet);
    }

    public PetDTO updatePet(Long id, PetDTO petDTO) {
        if (!authUtil.isAdmin()) {
            throw new UnauthorizedAccessException("Only admins can update pets");
        }

        Pet existingPet = petRepository.findById(id)
                        .orElseThrow(() -> new PetNotFoundException("Pet not found" + id));

        Pet updatedPet = petUpdater.applyUpdates(existingPet, petDTO);
        petRepository.save(updatedPet);
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
    public PetDTO getPetById(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Pet not found with id: " + id));
        return petMapper.toDto(pet);
    }

}
