package org.project.backend.service;

import org.project.backend.entities.Medecin;
import org.project.backend.repository.MedecinRepository;
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