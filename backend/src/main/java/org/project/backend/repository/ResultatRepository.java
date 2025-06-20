package org.project.backend.repository;
import org.project.backend.entities.DME;
import org.project.backend.entities.Resultat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultatRepository extends JpaRepository<Resultat,Long> {
    List<Resultat> getResultatsByDossier(DME dossier);
}
