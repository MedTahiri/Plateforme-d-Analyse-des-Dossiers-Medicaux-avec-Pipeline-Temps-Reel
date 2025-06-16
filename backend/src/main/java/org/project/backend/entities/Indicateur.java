package org.project.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Indicateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String unite ;

    public Indicateur() {
    }

    public Indicateur(String nom, String unite) {

        this.nom = nom;
        this.unite = unite;
    }

    public Long getId_indicateur() {
        return id;
    }

    public String getUnite() {
        return unite;
    }

    public String getNom() {
        return nom;
    }

    public void setId_indicateur(Long id_indicateur) {
        this.id = id_indicateur;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }

    @Override
    public String toString() {
        return "Indicateur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", unite='" + unite + '\'' +
                '}';
    }
}
