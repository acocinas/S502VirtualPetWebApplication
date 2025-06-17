package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.exception.HandleGenericException;
import com.virtualpet.petapi.model.DeveloperType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BasePointResolver {

    private final StackAffinityService stackAffinityService;

    public double resolveBasePoints(DeveloperType type, String stack) {
        if (stackAffinityService.isMainStack(type, stack)) return 4.0;
        if (stackAffinityService.isCommonStack(stack)) return 3.0;
        if (isInRivalMainStack(type, stack)) return 2.5;

        throw new HandleGenericException("Invalid stack: " + stack);
    }

    private boolean isInRivalMainStack(DeveloperType type, String stack) {
        DeveloperType rival = (type == DeveloperType.BACKEND)
                ? DeveloperType.FRONTEND
                : DeveloperType.BACKEND;
        return stackAffinityService.isMainStack(rival, stack);
    }
}