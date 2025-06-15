package com.virtualpet.petapi.service.study;

import com.virtualpet.petapi.model.DeveloperType;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class StackAffinityService {

    private static final Map<String, List<String>> MAIN_STACKS = Map.of(
            "BACKEND", List.of("Java", "Spring", "MySQL"),
            "FRONTEND", List.of("React", "HTML", "CSS")
    );

    private static final List<String> COMMON_STACKS = List.of("GitHub", "Docker", "Kubernetes");

    public boolean isMainStack(DeveloperType developerType, String stack) {
        return MAIN_STACKS.getOrDefault(developerType.name(), List.of()).stream()
                .anyMatch(stack::equalsIgnoreCase)
                || COMMON_STACKS.stream().anyMatch(stack::equalsIgnoreCase);
    }

    public boolean isCommonStack(String stack) {
        return COMMON_STACKS.stream().anyMatch(stack::equalsIgnoreCase);
    }
}
