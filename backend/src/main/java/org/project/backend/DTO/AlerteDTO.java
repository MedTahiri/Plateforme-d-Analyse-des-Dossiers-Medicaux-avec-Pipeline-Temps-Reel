package org.project.backend.DTO;

import org.project.backend.entities.Resultat;
import org.project.backend.entities.SeuilPR;

import java.io.Serializable;

public class AlerteDTO implements Serializable {

    private Resultat resultat ;
    private SeuilPR seuilPR;

    public AlerteDTO() {
    }

    public Resultat getResultat() {
        return resultat;
    }

    public SeuilPR getSeuilPR() {
        return seuilPR;
    }

    public void setSeuilPR(SeuilPR seuilPR) {
        this.seuilPR = seuilPR;
    }

    public void setResultat(Resultat resultat) {
        this.resultat = resultat;
    }

    @Override
    public String toString() {
        return "AlerteDTO{" +
                "resultat=" + resultat +
                ", seuilPR=" + seuilPR +
                '}';
    }
}
