package org.project.backend.repository;

import org.project.backend.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PatientRepository extends JpaRepository<Patient,Long> {

    List<Patient> findByUsername(String username);

    Object getPatientByUsername(String username);
}