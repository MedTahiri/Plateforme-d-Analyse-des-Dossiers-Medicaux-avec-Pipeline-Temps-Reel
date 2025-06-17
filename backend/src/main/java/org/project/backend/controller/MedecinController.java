package org.project.backend.controller;

import org.project.backend.entities.Medecin;
import org.project.backend.entities.SeuilPR;
import org.project.backend.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/medecins")
public class MedecinController {
    @Autowired
    private MedecinService medecinService;

    @GetMapping
    public List<Medecin> getAllMedecinService() {
        return medecinService.getAllMedecin();
    }

    @GetMapping("/{id}")
    public Medecin getMedecinById(@PathVariable Long id) {
        return medecinService.getMedecinById(id);
    }
    @PostMapping
    public Medecin createMedecin( @RequestBody Medecin medecin) {
        return medecinService.add(medecin);
    }

    @PutMapping("/{id}")
    public Medecin updateMedecin(@PathVariable Long id, @RequestBody Medecin updateMedecin) {
        return medecinService.updateMedecin(id, updateMedecin);
    }
    @GetMapping("/seuil/{id}")
    public List<SeuilPR> getAllSeuilbypatient(@PathVariable Long id){
        return medecinService.getAllSeuilbypatient(id);
    }
    @PostMapping("/seuil")
    public SeuilPR ajouterSeuil(@RequestBody SeuilPR seuilPR){
        return medecinService.addSeuil(seuilPR);
    }

    @DeleteMapping("/{id}")
    public boolean deleteMedecin(@PathVariable Long id) {
        return medecinService.deleteMedecin(id);
    }

}