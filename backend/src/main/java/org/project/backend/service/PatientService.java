package org.project.backend.service;

import org.project.backend.entities.DME;
import org.project.backend.entities.Medecin;
import org.project.backend.entities.Patient;
import org.project.backend.entities.Resultat;
import org.project.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

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
        return patientRepository.save(patient);
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient updatePatient(Long id,Patient updatePatient) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient == null) {
            return null;
        } else {
            patient.setName(updatePatient.getName());
            patient.setPrenom(updatePatient.getPrenom());
            patient.setDateNaissance(updatePatient.getDateNaissance());
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
    public Patient createPatient(Patient createPatient) {
        if (createPatient != null)
            return patientRepository.save(createPatient);
        return null;
    }
}
