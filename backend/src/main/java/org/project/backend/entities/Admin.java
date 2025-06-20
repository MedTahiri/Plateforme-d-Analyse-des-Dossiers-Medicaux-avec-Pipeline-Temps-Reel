package org.project.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "admins")
@Getter
@Setter
public class Admin extends Utilisateur {

    public Admin(String username, String password, String name, String prenom, LocalDate dateNaissance) {
        super(null, username, password, name, prenom, dateNaissance, Role.ADMIN);
    }


    public Admin() {

    }
}

