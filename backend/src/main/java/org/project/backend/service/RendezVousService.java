package org.project.backend.service;

import org.project.backend.entities.RendezVous;
import org.project.backend.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RendezVousService {
    @Autowired
    RendezVousRepository rendezVousRepository;

    public List<RendezVous> getAllRendezVousByMedecin(Long medecinID) {
        return rendezVousRepository.findAllByMedecinId(medecinID);
    }

    public List<RendezVous> getAllRendezVousByPatient(Long patientID) {
        return rendezVousRepository.findAllByPatientId(patientID);
    }

    public RendezVous getRendezVousById(Long id) {
        return rendezVousRepository.findById(id).orElse(null);
    }
}
