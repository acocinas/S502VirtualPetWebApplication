package com.virtualpet.petapi.service.actions;

import com.virtualpet.petapi.model.Pet;

public interface PetActionHandler {
    Pet execute(Long petId, String parameter);
}
