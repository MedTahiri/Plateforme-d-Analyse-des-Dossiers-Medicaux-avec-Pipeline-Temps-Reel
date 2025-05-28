package org.project.backend.configuration;

import org.project.backend.entities.Admin;
import org.project.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataInitializer implements ApplicationRunner {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        boolean adminExists = adminService.existsByUsername("admin");

        if (!adminExists) {
            Admin admin = new Admin(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    "admin",
                    "admin",
                    new Date(2003,10,30)
            );
            adminService.save(admin);
            System.out.println("✅ Default admin created.");
        } else {
            System.out.println("ℹ️ Admin already exists.");
        }

    }
}