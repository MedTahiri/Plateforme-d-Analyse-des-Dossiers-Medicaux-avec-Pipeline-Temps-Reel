package org.project.backend.controller;

import org.project.backend.entities.SecretaireMedical;
import org.project.backend.service.SecretaireMedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/api/secretaires"))
public class SecretaireMedicalController {
    @Autowired
    SecretaireMedicalService secretaireMedicalService;
    @DeleteMapping("/{id}")
    public void deleteSecretaireMedical(@PathVariable Long id) {
        secretaireMedicalService.deleteSecretaireMedical(id);
    }
    @PutMapping("/{id}")
    public SecretaireMedical updateSecretaireMedical(@PathVariable Long id, @RequestBody SecretaireMedical updateSecretaireMedical) {
        return secretaireMedicalService.updateSecretaireMedical(id, updateSecretaireMedical);
    }

    @GetMapping
    public List<SecretaireMedical> getSecretaireMedical() {
        return secretaireMedicalService.getAllSecretaireMedical();
    }

    @PostMapping
    public SecretaireMedical addSecretaireMedical(@RequestBody SecretaireMedical secretaireMedical) {
        return secretaireMedicalService.addSecretaireMedical(secretaireMedical);
    }

    @GetMapping("/{id}")
    public SecretaireMedical getSecretaireMedicalById(@PathVariable("id") Long id) {
        return secretaireMedicalService.getSecretaireMedicalById(id);
    }

}