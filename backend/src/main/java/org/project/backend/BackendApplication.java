package org.project.backend;

import org.project.backend.entities.Patient;
import org.project.backend.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner start(PatientRepository patientRepository) {
        return args -> {
            //Patient p=Patient.builder().id(null).name("hamza").prenom("Mr. Hamza").dateNaissance(new Date()).build();
            Patient p = new Patient(null, "yassir", "fahimmi", new Date());
            patientRepository.save(p); // Save the patient to the database
        };
    }
}
