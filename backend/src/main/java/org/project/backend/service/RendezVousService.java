package org.project.backend.service;

import org.project.backend.entities.RendezVous;
import org.project.backend.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RendezVousService {
    @Autowired
    RendezVousRepository rendezVousRepository;
    public void AddRendezVous(RendezVous rendezVous) {
        rendezVousRepository.save(rendezVous);
    }
    public RendezVous updateRendezVous(Long id,RendezVous rendezVous) {
        RendezVous rendezVous1=rendezVousRepository.findById(id).orElse(null);
        if(rendezVous!=null) {
            rendezVous1.setDate(rendezVous.getDate());
            rendezVous1.setMedecin(rendezVous.getMedecin());
            rendezVous1.setPatient(rendezVous.getPatient());
            rendezVous1.setStatus(rendezVous.getStatus());
            rendezVousRepository.save(rendezVous1);
        }
        return null;
    }
    public void DeleteRendezVous(Long id) {
        rendezVousRepository.deleteById(id);
    }

}
