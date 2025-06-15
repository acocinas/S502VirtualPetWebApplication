package com.virtualpet.petapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "pets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private DeveloperType developerType;
    @Enumerated(EnumType.STRING)
    private HabitatType habitatType;
    @Enumerated(EnumType.STRING)
    private AccessoryType accessoryType;

    private int knowledge;
    private int levelKnowledge;
    private int happiness;
    private int nutrition;
    private int energy;
    private int health;
    private int levelHealth;


    @ElementCollection
    private List<String> stacks;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
