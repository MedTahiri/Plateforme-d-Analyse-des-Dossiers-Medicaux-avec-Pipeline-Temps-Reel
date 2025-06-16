package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
//@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class DME {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateCreation;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference("patient-dossiers")
    private Patient patient;

    @OneToMany(mappedBy = "dossier")
    @JsonManagedReference("dme-resultats")
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
