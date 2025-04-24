package org.project.backend.entities;

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
@ToString
//@Builder

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
    private List<RendezVous> rendezVousList;

    public Patient() {}
    public Patient(Long id,String name, String prenom, Date dateNaissance) {
        this.id = id;
        this.name = name;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.rendezVousList = new ArrayList<>();

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPrenom() {
        return prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public List<RendezVous> getRendezVousList() {
        return rendezVousList;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public void setRendezVousList(List<RendezVous> rendezVousList) {
        this.rendezVousList = rendezVousList;
    }
}