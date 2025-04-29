package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "patients")
//@NoArgsConstructor
//@AllArgsConstructor
//@ToString
//@Builder
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String prenom;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date dateNaissance;
    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<RendezVous> rendezVousList;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<DME> dmes;





    public Patient(Long l,String name, String prenom, Date dateNaissance) {
        this.name = name;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.rendezVousList = new ArrayList<>();

    }
    public Patient() {}


}
