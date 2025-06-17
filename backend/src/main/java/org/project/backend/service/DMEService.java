package org.project.backend.service;

import org.project.backend.entities.DME;
import org.project.backend.entities.Patient;
import org.project.backend.repository.DMERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DMEService {
    @Autowired
    private DMERepository dmeRepository ;
    public List<DME> getAllDmes(){
        return dmeRepository.findAll();
    }

    public DME getDmeById(Long id) {
        return dmeRepository.findById(id).orElse(null);
    }

    public DME addDme(DME dme) {
        return dmeRepository.save(dme);
    }

    public DME updateDme(Long id, DME updatedme) {
        DME dme = dmeRepository.findById(id).orElse(null);
        if (dme == null) {
            return null;
        } else {
            if(updatedme.getDateCreation() != null){
                dme.setDateCreation(updatedme.getDateCreation());
            }
            if(updatedme.getMedecins() != null){
                dme.setMedecins(updatedme.getMedecins());
            }
            if(updatedme.getUrl() != null){
                dme.setUrl(updatedme.getUrl());
            }
            if(updatedme.getPatient() != null){
                dme.setPatient(updatedme.getPatient());
            }
            if(updatedme.getResultatList() != null){
                dme.setResultatList(updatedme.getResultatList());
            }
            return dmeRepository.save(dme);
        }
    }

    public boolean deleteDme(Long id) {
        DME dme = dmeRepository.findById(id).orElse(null);
        if (dme != null) {
            dmeRepository.delete(dme);
            return true;
        }
        return false;
    }

    public DME ajouteDme(DME dme, String fileName) {
        DME dmeAjoute = dme;
        dmeAjoute.setDateCreation(LocalDate.now());
        dme.setUrl(fileName);
        return dmeRepository.save(dmeAjoute);
    }

    public List<DME> getDmeByPatient(Long patientId) {
        return dmeRepository.findDMESByPatient_Id(patientId);
    }
}