package org.project.backend.controller;

import org.project.backend.entities.Patient;
import org.project.backend.repository.PatientRepository;
import org.project.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/api/patients")
class PatientController {
    @Autowired
    PatientService patientService;

    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping({"/{id}"})
    public Patient getPatient(Long id) {
        return patientService.getPatientById(id);
    }

}