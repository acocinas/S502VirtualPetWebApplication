package com.virtualpet.petapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

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
    private int energy;


    @ElementCollection
    @CollectionTable(name = "pet_study_points", joinColumns = @JoinColumn(name = "pet_id"))
    @MapKeyColumn(name = "stack_name")
    @Column(name = "study_points")
    private Map<String, Integer> stackPoints = new HashMap<>();


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
