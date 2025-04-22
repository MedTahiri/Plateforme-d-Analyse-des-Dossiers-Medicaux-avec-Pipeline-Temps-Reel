package org.project.backend.repository;


import org.project.backend.entities.SecretaireMedical;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SecretaireMedicalRepository extends JpaRepository<SecretaireMedical,Long> {
    List<SecretaireMedical> getSecretaireMedicalById(Long id);
}