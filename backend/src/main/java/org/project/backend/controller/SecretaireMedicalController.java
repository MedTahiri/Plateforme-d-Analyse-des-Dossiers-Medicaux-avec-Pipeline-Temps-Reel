package org.project.backend.controller;

import org.project.backend.entities.SecretaireMedical;
import org.project.backend.service.SecretaireMedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SecretaireMedicalController {
    @Autowired
    SecretaireMedicalService secretaireMedicalService;

    @GetMapping("/api/secretaires")
    public List<SecretaireMedical> getSecretaireMedical() {
        return secretaireMedicalService.getAllSecretaireMedical();
    }

    @PostMapping("/api/secretaires")
    public SecretaireMedical addSecretaireMedical(@RequestBody SecretaireMedical secretaireMedical) {
        return secretaireMedicalService.addSecretaireMedical(secretaireMedical);
    }

    @GetMapping("/api/secretaires/{id}")
    public SecretaireMedical getSecretaireMedicalById(@PathVariable("id") Long id) {
        return secretaireMedicalService.getSecretaireMedicalById(id);
    }

}