package org.project.backend.entities;

import jakarta.persistence.*;

@Entity
public class Resultat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeAnalyse;

    @ManyToOne
    @JoinColumn(name="dme_id")
    private DME dossier;


}
