package com.virtualpet.petapi.repository.custom;

import com.virtualpet.petapi.model.Pet;
import com.virtualpet.petapi.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class PetQueryRepositoryImplement implements PetQueryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean existsByNameForUser(String name, User user) {
        Long count = entityManager.createQuery(
                        "SELECT COUNT(p) FROM Pet p WHERE p.name = :name AND p.user = :user", Long.class)
                .setParameter("name", name)
                .setParameter("user", user)
                .getSingleResult();
        return count > 0;

    }
}
