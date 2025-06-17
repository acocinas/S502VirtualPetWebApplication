package com.virtualpet.petapi.repository.custom;

import com.virtualpet.petapi.model.User;

public interface PetQueryRepository {
    boolean existsByNameForUser(String name, User user);
}
