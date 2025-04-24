package org.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.project.backend.entities.RendezVous;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
}
