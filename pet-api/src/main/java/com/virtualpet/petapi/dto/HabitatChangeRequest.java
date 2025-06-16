package com.virtualpet.petapi.dto;

import com.virtualpet.petapi.model.HabitatType;
import lombok.*;

@Getter @Setter
public class HabitatChangeRequest {
    private HabitatType newHabitat;
}
