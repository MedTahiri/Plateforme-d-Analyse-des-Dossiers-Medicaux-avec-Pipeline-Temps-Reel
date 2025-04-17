package org.project.backend.service;

import org.project.backend.entities.Patient;
import org.project.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public Patient getPatientById(Long id) {
        return patientRepository.getPatientById(id);
    }
    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}