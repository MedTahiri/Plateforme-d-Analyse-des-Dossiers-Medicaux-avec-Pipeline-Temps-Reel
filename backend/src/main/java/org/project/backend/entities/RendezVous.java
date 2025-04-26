package org.project.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class RendezVous {
    @Id
    private int id;
    private Date date;
    private String status;
    @ManyToOne
    @JoinColumn(name = "medicin_id")
    private Medecin medecin;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
