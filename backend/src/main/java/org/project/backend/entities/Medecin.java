package org.project.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "medecins")
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Medecin extends Utilisateur {

    @OneToMany(mappedBy = "medecin", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<RendezVous> rendezVousList;

    //TODO()
    @ManyToMany(mappedBy = "medecins")
    @JsonIgnore
    private List<DME> dmes;

    @OneToMany(mappedBy = "medcin")
    @JsonManagedReference("medcin-seuilpr")
    private List<SeuilPR> seuilPRS;



    public  Medecin() {
        role=Role.MEDECIN;
    }
}


