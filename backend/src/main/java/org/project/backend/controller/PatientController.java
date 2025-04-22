package org.project.backend.controller;

import org.project.backend.entities.Patient;
import org.project.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
class PatientController {
    @Autowired
    PatientService patientService;

    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Optional<Patient> getPatient(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }
}