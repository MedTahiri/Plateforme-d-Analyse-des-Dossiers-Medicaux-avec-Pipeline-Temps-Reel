package org.project.backend.service;

import org.project.backend.entities.SecretaireMedical;
import org.project.backend.repository.SecretaireMedicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class SecretaireMedicalService {
    @Autowired
    SecretaireMedicalRepository secretaireMedicalRepository;
    public void deleteSecretaireMedical(Long id) {
        secretaireMedicalRepository.deleteById(id);
    }
    public SecretaireMedical updateSecretaireMedical(Long id, SecretaireMedical updatedSecretaireMedical) {
        SecretaireMedical existingSecretaireMedical = (SecretaireMedical) secretaireMedicalRepository.getSecretaireMedicalById(id);
        if (existingSecretaireMedical == null) {
            return null;
        } else {
            existingSecretaireMedical.setName(updatedSecretaireMedical.getName());
            existingSecretaireMedical.setPrenom(updatedSecretaireMedical.getPrenom());
            existingSecretaireMedical.setDateNaissance(updatedSecretaireMedical.getDateNaissance());
            return secretaireMedicalRepository.save(existingSecretaireMedical);
        }
    }


    }


    public List<SecretaireMedical> getAllSecretaireMedical() {
        return secretaireMedicalRepository.findAll();
    }

    public SecretaireMedical addSecretaireMedical(SecretaireMedical secretaireMedical) {
        return secretaireMedicalRepository.save(secretaireMedical);
    }

    public SecretaireMedical getSecretaireMedicalById(Long id) {
        return secretaireMedicalRepository.findById(id).orElse(null);
    }
}