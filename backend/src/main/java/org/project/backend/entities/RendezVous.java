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
    private Medecin medecin;
    @ManyToOne
    @JoinColumn(name = "id")
    private Patient patient;
}
