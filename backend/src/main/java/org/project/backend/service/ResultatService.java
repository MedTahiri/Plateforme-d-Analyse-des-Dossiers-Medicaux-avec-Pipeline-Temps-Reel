package org.project.backend.service;
import org.project.backend.entities.Resultat;
import org.project.backend.repository.ResultatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ResultatService {
    @Autowired
    private ResultatRepository resultatRepository;

    public List<Resultat> getAllResultats() {
        return resultatRepository.findAll();
    }

    public Resultat getResultatById(Long id) {
        return resultatRepository.findById(id).orElse(null);
    }

    public Resultat addResultat(Resultat resultat) {
        return resultatRepository.save(resultat);
    }

    public Resultat updateResultat(Long id, Resultat updatedResultat) {
        Resultat resultat = resultatRepository.findById(id).orElse(null);
        if (resultat == null) {
            return null;
        } else {
            //if (updatedResultat.getValeur() != null) {
                resultat.setValeur(updatedResultat.getValeur());
            //}
            if (updatedResultat.getDossier() != null) {
                resultat.setDossier(updatedResultat.getDossier());
            }
            if (updatedResultat.getDateMesure() != null) {
                resultat.setDateMesure(updatedResultat.getDateMesure());
            }
            return resultatRepository.save(resultat);
        }
    }


    public boolean deleteResultat(Long id) {
        Resultat resultat = resultatRepository.findById(id).orElse(null);
        if (resultat != null) {
            resultatRepository.delete(resultat);
            return true;
        }
        return false;
    }
}
