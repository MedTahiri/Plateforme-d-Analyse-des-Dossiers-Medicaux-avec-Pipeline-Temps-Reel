package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Resultat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double valeur;
    private LocalDate dateMesure;
    @ManyToOne
    @JoinColumn(name="dme_id")
    //@JsonIgnore
    @JsonBackReference("dme-resultats")
    private DME dossier;

    @ManyToOne
    @JoinColumn(name = "indicateur_id")
    private Indicateur indicateur;

}
