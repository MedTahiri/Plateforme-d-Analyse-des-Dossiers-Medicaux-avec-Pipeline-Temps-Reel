package org.project.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admins")
@Getter
@Setter
public class Admin extends Utilisateur {


    public Admin() {
        role=Role.ADMIN;
    }
}

