package org.project.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RendezVous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;
    private String status;
    @ManyToOne
    @JoinColumn(name = "medecin_id")
    private Medecin medecin;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}

