package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
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
    @JsonIgnore
    private List<DME> dmes;

    public Patient(){
        role=Role.PATIENT;
    }
}


