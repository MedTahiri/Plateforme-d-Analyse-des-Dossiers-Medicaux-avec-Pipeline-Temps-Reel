package org.project.backend;

import org.project.backend.Alerte.ProducerService;
import org.project.backend.entities.Patient;
import org.project.backend.entities.Resultat;
import org.project.backend.repository.PatientRepository;
import org.project.backend.repository.ResultatRepository;
import org.project.backend.repository.SeuilPR_JPA;
import org.project.backend.service.ServiceAlerte;
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

//    @Bean
//    public CommandLineRunner start(PatientRepository patientRepository) {
//        return args -> {
////            //Patient p=Patient.builder().id(null).name("hamza").prenom("Mr. Hamza").dateNaissance(new Date()).build();
////            Patient p = new Patient(null, "yassir", "fahimmi", new Date());
////            patientRepository.save(p); // Save the patient to the database
//        };
//    }
/*
@Bean
public CommandLineRunner commandLineRunner(SeuilPR_JPA seuilPRJpa,
                                           ServiceAlerte serviceAlerte,
                                           ResultatRepository resultatJPA,
                                           ProducerService producerService) {
    return args -> {
        long id_p = 1L;
        long id_d = 1L;
        //SeuilPR seuilPR = seuilPRJpa.findSeuilPRByIndicateurIdAndPatientId(id_p, id_d);
        //System.out.println("Résultat au démarrage : " + seuilPR.toString());
        serviceAlerte.Alerte(1, 52);
        Resultat resultat = resultatJPA.findById(1L).orElse(null);
        System.out.println(resultat);
        producerService.producer(1, "HHOOOOOPPPPPPPPPPPP");
    };
}*/

}
