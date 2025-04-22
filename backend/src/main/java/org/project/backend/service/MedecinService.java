package org.project.backend.service;

import org.project.backend.entities.Medecin;
import org.project.backend.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedecinService {

    @Autowired
    private MedecinRepository medecinRepository;

    public List<Medecin> getAllMedecin(){
        return medecinRepository.findAll();
    }
    public Medecin getMedecinById(Long id){
        Medecin medecin = medecinRepository.findById(id).orElse(null);
        return medecin;
    }
    public Medecin add(Medecin medecin){
        return medecinRepository.save(medecin);
    }

    public Medecin updateMedecin(Long id, Medecin updatedMedecin) {
        Medecin medecin = medecinRepository.findById(id).orElse(null);
        if (medecin == null) {
            return null;
        } else {
            medecin.setName(updatedMedecin.getName());
            medecin.setPrenom(updatedMedecin.getPrenom());
            medecin.setDateNaissance(updatedMedecin.getDateNaissance());
            return medecinRepository.save(medecin);
        }
    }

    public void deleteMedecin(Long id) {
        Medecin medecin = medecinRepository.findById(id).orElse(null);
        if (medecin != null) {
            medecinRepository.delete(medecin);
        }
    }

}