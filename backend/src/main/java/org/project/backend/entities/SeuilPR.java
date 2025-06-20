package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class SeuilPR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double seuilMax;
    private double seuiMin;
    private LocalDate dateDefinition;

    @ManyToOne
    @JoinColumn(name = "indicateur_id")
    private Indicateur indicateur;

    @ManyToOne
    @JoinColumn(name = "medcin_id")
    @JsonBackReference("medcin-seuilpr")
    private Medecin medcin;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference("patient-seuils")
    private Patient patient;

    public SeuilPR() {
    }

    public SeuilPR(double seuilMax, double seuiMin, LocalDate dateDefinition, Indicateur indicateur, Medecin medcin, Patient patient) {
        this.seuilMax = seuilMax;
        this.seuiMin = seuiMin;
        this.dateDefinition = dateDefinition;
        this.indicateur = indicateur;
        this.medcin = medcin;
        this.patient = patient;
    }

    public Long getId() {
        return id;
    }

    public double getSeuilMax() {
        return seuilMax;
    }

    public double getSeuiMin() {
        return seuiMin;
    }

    public LocalDate getDateDefinition() {
        return dateDefinition;
    }

    public Indicateur getIndicateur() {
        return indicateur;
    }

    public Medecin getMedcin() {
        return medcin;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSeuilMax(double seuilMax) {
        this.seuilMax = seuilMax;
    }

    public void setSeuiMin(double seuiMin) {
        this.seuiMin = seuiMin;
    }

    public void setDateDefinition(LocalDate dateDefinition) {
        this.dateDefinition = dateDefinition;
    }

    public void setIndicateur(Indicateur indicateur) {
        this.indicateur = indicateur;
    }

    public void setMedcin(Medecin medcin) {
        this.medcin = medcin;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "SeuilPR{" +
                "id=" + id +
                ", seuilMax=" + seuilMax +
                ", seuiMin=" + seuiMin +
                ", dateDefinition=" + dateDefinition +
                ", indicateur=" + indicateur +
//                ", medcin=" + medcin +
//                ", patient=" + patient +
                '}';
    }
}
