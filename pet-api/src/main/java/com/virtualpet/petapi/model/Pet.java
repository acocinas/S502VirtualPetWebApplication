package com.virtualpet.petapi.model;

import jakarta.persistence.*;
import lombok.*;

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
    private String type;
    private String mood;
    private int energy;
    private String environment;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
