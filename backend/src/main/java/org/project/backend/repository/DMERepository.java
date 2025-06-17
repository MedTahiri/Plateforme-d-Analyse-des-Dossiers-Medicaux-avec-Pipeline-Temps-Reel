package org.project.backend.repository;

import org.project.backend.entities.DME;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DMERepository extends JpaRepository<DME,Long> {

    List<DME> findAllByPatient_Id(Long patientId);

    List<DME> findDMESByPatient_Id(Long patientId);
}
