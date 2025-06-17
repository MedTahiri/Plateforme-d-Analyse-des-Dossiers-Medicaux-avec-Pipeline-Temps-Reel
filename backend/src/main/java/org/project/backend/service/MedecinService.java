package org.project.backend.service;

import org.project.backend.entities.Indicateur;
import org.project.backend.entities.Medecin;
import org.project.backend.entities.Patient;
import org.project.backend.entities.SeuilPR;
import org.project.backend.repository.IndicateurJPA;
import org.project.backend.repository.MedecinRepository;
import org.project.backend.repository.SeuilPR_JPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedecinService {
    @Autowired
    private PasswordEncoder passwordEncoder ;
    @Autowired
    private MedecinRepository medecinRepository;
    @Autowired
    private SeuilPR_JPA seuilPRJpa;
    @Autowired
    private IndicateurJPA indicateurJPA;
    public List<SeuilPR> getAllSeuilbypatient(Long patient_id){
        return seuilPRJpa.findByPatientId(patient_id);
    }
//    public SeuilPR addSeuil(SeuilPR seuilPR){
//        if(seuilPRJpa.findSeuilPRByIndicateurAndPatientAndMedcin( seuilPR.getIndicateur(),  seuilPR.getPatient() ,  seuilPR.getMedcin()) == null){
//            indicateurJPA.save(seuilPR.getIndicateur());
//            return  seuilPRJpa.save(seuilPR);
//
//        }
//        else {
//            SeuilPR seuilPR1 = seuilPRJpa.findSeuilPRByIndicateurAndPatientAndMedcin( seuilPR.getIndicateur(),  seuilPR.getPatient() ,  seuilPR.getMedcin());
//            seuilPR1.setSeuilMax(seuilPR.getSeuilMax());
//            seuilPR1.setSeuiMin(seuilPR.getSeuiMin());
//            seuilPR1.setDateDefinition(seuilPR.getDateDefinition());
//            return seuilPRJpa.save(seuilPR1);
//
//        }
//    }

    public SeuilPR addSeuil(SeuilPR seuilPR){
        Indicateur indicateur = seuilPR.getIndicateur();

        // Vérifie s'il existe déjà un indicateur avec ce nom et cette unité
        Indicateur existingIndicateur = indicateurJPA.findByNomAndUnite(
                indicateur.getNom(), indicateur.getUnite()
        );

        if (existingIndicateur == null) {
            // Pas trouvé, donc on le sauvegarde
            existingIndicateur = indicateurJPA.save(indicateur);
        }

        // Assure-toi que SeuilPR utilise une entité persistée
        seuilPR.setIndicateur(existingIndicateur);

        // Chercher si un SeuilPR existe déjà pour le triplet
        SeuilPR existing = seuilPRJpa.findSeuilPRByIndicateurAndPatientAndMedcin(
                existingIndicateur, seuilPR.getPatient(), seuilPR.getMedcin()
        );

        if (existing == null) {
            return seuilPRJpa.save(seuilPR);
        } else {
            existing.setSeuilMax(seuilPR.getSeuilMax());
            existing.setSeuiMin(seuilPR.getSeuiMin());
            existing.setDateDefinition(seuilPR.getDateDefinition());
            return seuilPRJpa.save(existing);
        }
    }


    public List<Medecin> getAllMedecin(){
        return medecinRepository.findAll();
    }
    public Medecin getMedecinById(Long id){
        return medecinRepository.findById(id).orElse(null);
    }
    public Medecin add(Medecin medecin){
        String encodedPassword = passwordEncoder.encode(medecin.getPassword());
        medecin.setPassword(encodedPassword);
        return medecinRepository.save(medecin);
    }


    public Medecin updateMedecin(Long id, Medecin updatedMedecin) {
        Medecin medecin = medecinRepository.findById(id).orElse(null);
        if (medecin == null) {
            return null;
        } else {
            if (updatedMedecin.getName() != null) {
                medecin.setName(updatedMedecin.getName());
            }
            if (updatedMedecin.getPrenom() != null) {
                medecin.setPrenom(updatedMedecin.getPrenom());
            }
            if (updatedMedecin.getDateNaissance() != null) {
                medecin.setDateNaissance(updatedMedecin.getDateNaissance());
            }
            if (updatedMedecin.getPassword() != null) {
                String encodedPassword = passwordEncoder.encode(updatedMedecin.getPassword());
                medecin.setPassword(encodedPassword);
            }
            if (updatedMedecin.getUsername() != null) {
                medecin.setUsername(updatedMedecin.getUsername());
            }
            return medecinRepository.save(medecin);
        }
    }


    public boolean deleteMedecin(Long id) {
        Medecin medecin = medecinRepository.findById(id).orElse(null);
        if (medecin != null) {
            medecinRepository.delete(medecin);
            return true ;
        }
        return false;
    }

    public Object getMedecinByUsername(String username) {
        return medecinRepository.getMedecinByUsername(username);
    }
}