package org.project.backend.controller;

import org.project.backend.entities.RendezVous;
import org.project.backend.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {
    @Autowired
    RendezVousService rendezVousService;

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
