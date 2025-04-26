package org.project.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DME {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateCreation;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToMany(mappedBy = "dossier")
    private List<Resultat> resultatList;
    private String url ;
    @ManyToMany
    @JoinTable(
            name = "dme_medecin", // nom de la table d'association

            joinColumns = @JoinColumn(name = "dme_id"), // colonne qui référence DME
            inverseJoinColumns = @JoinColumn(name = "medecin_id") // colonne qui référence Medecin
    )
    private List<Medecin> medecins;

}
