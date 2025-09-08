package com.ani.backend.registration;


import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Instant registeredAt = Instant.now();

    public Registration() {}

    public Registration(String name) {
        this.name = name;
        this.registeredAt = Instant.now();
    }

    public String getName() {
        return name;
    }
}
