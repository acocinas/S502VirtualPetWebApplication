package com.virtualpet.petapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pets")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String developerType;
    private String habitat;


    private int knowledge;
    private int levelKnowledge;
    private int happiness;
    private int hunger;
    private int energy;
    private int health;
    private int levelHealth;

    private String accessory;

    @ElementCollection
    private List<String> stacks;

    private LocalDateTime lastSleep;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
