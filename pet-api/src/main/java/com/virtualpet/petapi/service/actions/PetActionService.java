package com.virtualpet.petapi.service.actions;

import com.virtualpet.petapi.exception.HandleGenericException;
import com.virtualpet.petapi.model.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PetActionService {

    private final Map<String, PetActionHandler> handlers;

    public Pet performAction(String action, Long petId, String parameter) {
        PetActionHandler handler = handlers.get(action.toLowerCase());
        if (handler == null) {
            throw new HandleGenericException("Unknown action: " + action);
        }
        return handler.execute(petId, parameter);
    }
}


