package org.project.backend.repository;

import org.project.backend.entities.Indicateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicateurJPA extends JpaRepository<Indicateur,Long> {
    Indicateur findByNomAndUnite(String nom, String unite);

    Indicateur findByNom(String nom);
}
