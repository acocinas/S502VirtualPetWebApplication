package com.virtualpet.petapi.model;

public enum AccessoryType {
    DESKTOP,
    LAPTOP,
    ULTRA_LAPTOP,
    ULTRA_LAPTOP_MONITOR,
    SETUP_GAMER,
    SETUP_PROFESIONAL_ULTIMATE;

    public AccessoryType getNextLevel() {
        return switch (this){
            case DESKTOP -> LAPTOP;
            case LAPTOP -> ULTRA_LAPTOP;
            case ULTRA_LAPTOP -> ULTRA_LAPTOP_MONITOR;
            case ULTRA_LAPTOP_MONITOR -> SETUP_GAMER;
            case SETUP_GAMER -> SETUP_PROFESIONAL_ULTIMATE;
            case SETUP_PROFESIONAL_ULTIMATE -> this;
        };
    }
}