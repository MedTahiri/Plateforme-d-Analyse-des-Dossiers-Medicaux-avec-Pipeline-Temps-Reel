package org.project.backend.service;

import org.project.backend.entities.RendezVous;
import org.project.backend.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RendezVousService {
    @Autowired
    RendezVousRepository rendezVousRepository;

    public void AddRendezVous(RendezVous rendezVous) {
        rendezVousRepository.save(rendezVous);
    }

    public RendezVous updateRendezVous(Long id, RendezVous updatedRendezVous) {
        RendezVous rendezVous = rendezVousRepository.findById(id).orElse(null);
        if (rendezVous == null) {
            return null;
        } else {
            if (updatedRendezVous.getDate() != null) {
                rendezVous.setDate(updatedRendezVous.getDate());
            }
            if (updatedRendezVous.getMedecin() != null) {
                rendezVous.setMedecin(updatedRendezVous.getMedecin());
            }
            if (updatedRendezVous.getPatient() != null) {
                rendezVous.setPatient(updatedRendezVous.getPatient());
            }
            if (updatedRendezVous.getStatus() != null) {
                rendezVous.setStatus(updatedRendezVous.getStatus());
            }
            return rendezVousRepository.save(rendezVous);
        }
    }

    public void DeleteRendezVous(Long id) {
        rendezVousRepository.deleteById(id);
    }

    public List<RendezVous> getAllRendezVousByMedecin(Long medecinID) {
        return rendezVousRepository.findAllByMedecinId(medecinID);
    }

    public List<RendezVous> getAllRendezVousByPatient(Long patientID) {
        return rendezVousRepository.findAllByPatientId(patientID);
    }

    public RendezVous getRendezVousById(Long id) {
        return rendezVousRepository.findById(id).orElse(null);
    }

    // FIXED: Changed int to Long and fixed the Optional usage
    public void annulerRendezVous(Long id) {
        Optional<RendezVous> optionalRendezVous = rendezVousRepository.findById(id);

        if (optionalRendezVous.isEmpty()) {
            throw new RuntimeException("RendezVous with ID " + id + " not found");
        }

        RendezVous rendezVous = optionalRendezVous.get();
        rendezVous.setStatus("annulé");

        rendezVousRepository.save(rendezVous);

        // Add logging to verify the save
        System.out.println("RendezVous " + id + " status set to: " + rendezVous.getStatus());
    }

    // FIXED: Changed int to Long and fixed the Optional usage
    public void terminerRendezVous(Long id) {
        Optional<RendezVous> optionalRendezVous = rendezVousRepository.findById(id);

        if (optionalRendezVous.isEmpty()) {
            throw new RuntimeException("RendezVous with ID " + id + " not found");
        }

        RendezVous rendezVous = optionalRendezVous.get();
        rendezVous.setStatus("terminé");

        rendezVousRepository.save(rendezVous);

        // Add logging to verify the save
        System.out.println("RendezVous " + id + " status set to: " + rendezVous.getStatus());
    }
}