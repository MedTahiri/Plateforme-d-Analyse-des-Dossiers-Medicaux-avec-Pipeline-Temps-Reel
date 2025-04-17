package org.project.backend.controller;

import org.project.backend.entities.Medecin;
import org.project.backend.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MedecinController {

    @Autowired
    private MedecinService medecinService;

    @PutMapping("/api/medecins/{id}")
    public Medecin updateMedecin(@PathVariable Long id, @RequestBody Medecin updateMedecin) {
        return medecinService.updateMedecin(id, updateMedecin);
    }

    @DeleteMapping("/api/medecins/{id}")
    public void deleteMedecin(@PathVariable Long id) {
        medecinService.deleteMedecin(id);
    }


}