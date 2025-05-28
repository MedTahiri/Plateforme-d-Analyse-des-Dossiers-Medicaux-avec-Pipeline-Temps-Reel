package org.project.backend.repository;

import org.project.backend.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Object findByUsername(String username);

    Object getAdminByUsername(String username);

    boolean existsByUsername(String username);
}
