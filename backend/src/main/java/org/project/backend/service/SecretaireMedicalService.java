package org.project.backend.service;

import org.project.backend.entities.SecretaireMedical;
import org.project.backend.repository.SecretaireMedicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class SecretaireMedicalService {
    @Autowired
    private PasswordEncoder passwordEncoder ;
    @Autowired
    private SecretaireMedicalRepository secretaireMedicalRepository;
    public void deleteSecretaireMedical(Long id) {
        secretaireMedicalRepository.deleteById(id);
    }
    public SecretaireMedical updateSecretaireMedical(Long id, SecretaireMedical updatedSecretaireMedical) {
        SecretaireMedical secretaireMedical = secretaireMedicalRepository.findById(id).orElse(null);
        if (secretaireMedical == null) {
            return null;
        } else {
            if (updatedSecretaireMedical.getName() != null) {
                secretaireMedical.setName(updatedSecretaireMedical.getName());
            }
            if (updatedSecretaireMedical.getPrenom() != null) {
                secretaireMedical.setPrenom(updatedSecretaireMedical.getPrenom());
            }
            if (updatedSecretaireMedical.getDateNaissance() != null) {
                secretaireMedical.setDateNaissance(updatedSecretaireMedical.getDateNaissance());
            }
            if (updatedSecretaireMedical.getPassword() != null) {
                String encodedPassword = passwordEncoder.encode(updatedSecretaireMedical.getPassword());
                secretaireMedical.setPassword(encodedPassword);
            }
            if (updatedSecretaireMedical.getUsername() != null) {
                secretaireMedical.setUsername(updatedSecretaireMedical.getUsername());
            }
            return secretaireMedicalRepository.save(secretaireMedical);
        }
    }



    public List<SecretaireMedical> getAllSecretaireMedical() {
        return secretaireMedicalRepository.findAll();
    }

    public SecretaireMedical addSecretaireMedical(SecretaireMedical secretaireMedical) {
        String encodedPassword = passwordEncoder.encode(secretaireMedical.getPassword());
        secretaireMedical.setPassword(encodedPassword);
        return secretaireMedicalRepository.save(secretaireMedical);
    }

    public SecretaireMedical getSecretaireMedicalById(Long id) {
        return secretaireMedicalRepository.findById(id).orElse(null);
    }
}