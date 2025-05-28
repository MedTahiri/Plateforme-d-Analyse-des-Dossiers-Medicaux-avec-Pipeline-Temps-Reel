package org.project.backend.service;

import org.project.backend.entities.Admin;
import org.project.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Object getAdminByUsername(String name) {
        return adminRepository.getAdminByUsername(name);
    }

    public boolean existsByUsername(String username) {
        return adminRepository.existsByUsername(username);
    }

    public void save(Admin admin) {
        adminRepository.save(admin);
    }
}
