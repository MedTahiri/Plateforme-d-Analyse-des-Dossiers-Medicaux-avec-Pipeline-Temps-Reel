package org.project.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "secretaires")
@Getter
@Setter
@Builder
public class SecretaireMedical extends Utilisateur {
    public SecretaireMedical(){
        role=Role.SECRETAIRE_MEDICAL;
    }
}

