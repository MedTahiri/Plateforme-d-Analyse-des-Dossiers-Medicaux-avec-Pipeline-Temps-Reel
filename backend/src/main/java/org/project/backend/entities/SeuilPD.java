package org.project.backend.entities;

import jakarta.persistence.*;

@Entity
public class SeuilPD {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double seuilMin;
    private double seuilMax;
    @ManyToOne
    @JoinColumn(name = "indicateur_id")
    private Indicateur indicateur;

    public SeuilPD() {
    }

    public SeuilPD(double seuilMin, double seuilMax, Indicateur indicateur) {
        this.seuilMin = seuilMin;
        this.seuilMax = seuilMax;
        this.indicateur = indicateur;
    }

    public Long getId() {
        return id;
    }

    public double getSeuilMin() {
        return seuilMin;
    }

    public double getSeuilMax() {
        return seuilMax;
    }

    public Indicateur getIndicateur() {
        return indicateur;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSeuilMin(double seuilMin) {
        this.seuilMin = seuilMin;
    }

    public void setSeuilMax(double seuilMax) {
        this.seuilMax = seuilMax;
    }

    public void setIndicateur(Indicateur indicateur) {
        this.indicateur = indicateur;
    }
}
