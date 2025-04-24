package org.project.backend.entities;

import jakarta.persistence.*;

import java.util.Date;
@Entity
public class RendezVous {
    @Id
    private int id;
    private Date date;
    private boolean status;
    @ManyToOne
    @JoinColumn(name = "medicin_id")
    private Medecin medecin;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
