package org.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.project.backend.entities.RendezVous;

import java.util.List;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findAllByMedecinId(Long medecinID);

    List<RendezVous> findAllByPatientId(Long patientID);
}
