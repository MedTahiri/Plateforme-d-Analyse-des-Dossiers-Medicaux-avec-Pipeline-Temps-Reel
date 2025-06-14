package org.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.project.backend.entities.RendezVous;

import java.util.List;
import java.util.Optional;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findAllByMedecinId(Long medecinID);

    List<RendezVous> findAllByPatientId(Long patientID);
    Optional<RendezVous> findById(Long id);
}
