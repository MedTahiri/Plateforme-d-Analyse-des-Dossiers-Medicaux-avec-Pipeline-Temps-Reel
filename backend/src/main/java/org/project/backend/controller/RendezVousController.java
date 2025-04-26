package org.project.backend.controller;

import org.project.backend.entities.RendezVous;
import org.project.backend.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {
    @Autowired
    RendezVousService rendezVousService;

    @GetMapping("/medecin")
    public List<RendezVous> getAllRendezVousByMedecin(@RequestParam("id") Long medecinID) {
        return rendezVousService.getAllRendezVousByMedecin(medecinID);
    }

    @GetMapping("/patient")
    public List<RendezVous> getAllRendezVousByPatient(@RequestParam("id") Long patientID) {
        return rendezVousService.getAllRendezVousByPatient(patientID);
    }

    @GetMapping("/{id}")
    public RendezVous getRendezVousById(@PathVariable Long id) {
        return rendezVousService.getRendezVousById(id);
    }


    @PostMapping
    public void ajouterRendezVous(@RequestBody RendezVous rendezVous) {
        rendezVousService.AddRendezVous(rendezVous);
    }
    @PutMapping("/{id}")
    public void updateRendezVous(@RequestBody RendezVous rendezVous, @PathVariable Long id) {
        rendezVousService.updateRendezVous(id, rendezVous);
    }
    @DeleteMapping("/{id}")
    public void deleteRendezVous(@PathVariable Long id) {
        rendezVousService.DeleteRendezVous(id);
    }
}
