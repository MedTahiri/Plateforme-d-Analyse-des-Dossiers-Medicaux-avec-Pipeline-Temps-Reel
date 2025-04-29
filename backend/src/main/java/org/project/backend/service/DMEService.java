package org.project.backend.service;

import org.project.backend.entities.DME;
import org.project.backend.entities.Patient;
import org.project.backend.repository.DMERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DMEService {
    @Autowired
    private DMERepository dmeRepository ;
    public List<DME> getAllDmes(){
        return dmeRepository.findAll();
    }
    public DME addDme(DME dme) {
        return dmeRepository.save(dme);
    }
    public DME updateDme(Long id ,DME updatedme){
        DME dme = dmeRepository.findById(id).orElse(null);
        if (dme == null) {
            return null;
        } else {
            dme.setDateCreation(updatedme.getDateCreation());
            dme.setMedecins(updatedme.getMedecins());
            dme.setUrl(updatedme.getUrl());
            dme.setPatient(updatedme.getPatient());
            dme.setResultatList(updatedme.getResultatList());
            return dmeRepository.save(dme);
        }
    }
}
