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
}
