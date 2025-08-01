package com.virtualpet.petapi.repository;

import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findByUser(User user);

}
