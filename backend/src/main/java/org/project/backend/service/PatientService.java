package org.project.backend.service;

import org.project.backend.entities.DME;
import org.project.backend.entities.Patient;
import org.project.backend.entities.Resultat;
import org.project.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PasswordEncoder passwordEncoder ;
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public List<DME> getAllDmes(Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient == null) {
            return null;
        } else {
            return patient.getDmes();
        }

    }
    public List<Resultat> getAllResultats(Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient == null) {
            return null;
        } else {
            List<DME> Ldmes = patient.getDmes();
            List<Resultat> listeResultats = new ArrayList<>();
            for (DME dme : Ldmes){
                listeResultats.addAll(dme.getResultatList());
            }
            return listeResultats;
        }

    }
    public Patient addPatient(Patient patient) {

        String encodedPassword = passwordEncoder.encode(patient.getPassword());
        patient.setPassword(encodedPassword);
        return patientRepository.save(patient);
    }


    public Optional<Patient> getPatientById(Long id) {

        return patientRepository.findById(id);
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient == null) {
            return null;
        } else {
            if (updatedPatient.getName() != null) {
                patient.setName(updatedPatient.getName());
            }
            if (updatedPatient.getPrenom() != null) {
                patient.setPrenom(updatedPatient.getPrenom());
            }
            if (updatedPatient.getDateNaissance() != null) {
                patient.setDateNaissance(updatedPatient.getDateNaissance());
            }
            if (updatedPatient.getPassword() != null) {
                String encodedPassword = passwordEncoder.encode(updatedPatient.getPassword());
                patient.setPassword(encodedPassword);
            }
            if (updatedPatient.getUsername() != null) {
                patient.setUsername(updatedPatient.getUsername());
            }
            return patientRepository.save(patient);
        }
    }


    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
