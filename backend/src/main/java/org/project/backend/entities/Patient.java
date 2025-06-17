package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "patients")
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Patient extends Utilisateur {

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<RendezVous> rendezVousList;

    @OneToMany(mappedBy = "patient")
    //@JsonIgnore
    @JsonManagedReference("patient-dossiers")
    private List<DME> dmes;

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference("patient-seuils")
    private List<SeuilPR> seuilPRS;


    public Patient(){
        role=Role.PATIENT;
    }


}


