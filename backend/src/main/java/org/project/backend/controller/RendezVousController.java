package org.project.backend.controller;

import org.project.backend.entities.RendezVous;
import org.project.backend.repository.RendezVousRepository;
import org.project.backend.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {
    @Autowired
    RendezVousService rendezVousService;
    @Autowired
    private RendezVousRepository rendezVousRepository;

    @GetMapping
    public List<RendezVous> getRendezVous() {
        return rendezVousRepository.findAll();
    }

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

    // FIXED: Changed int to Long and added proper response
    @PutMapping("/annuler/{id}")
    public ResponseEntity<Map<String, Object>> annulerRendezVous(@PathVariable Long id) {
        try {
            rendezVousService.annulerRendezVous(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "RendezVous annulé avec succès");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }

    // FIXED: Changed int to Long and added proper response
    @PutMapping("/terminer/{id}")
    public ResponseEntity<Map<String, Object>> terminerRendezVous(@PathVariable Long id) {
        try {
            rendezVousService.terminerRendezVous(id);

            // Verify the update by fetching the updated record
            RendezVous updatedRendezVous = rendezVousService.getRendezVousById(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "RendezVous terminé avec succès");
            response.put("data", updatedRendezVous);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erreur: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }
}