package org.project.backend.controller;

import org.project.backend.entities.Resultat;
import org.project.backend.service.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/resultat")
public class ResultatController {
    @Autowired
    private ResultatService resultatService;

    @GetMapping
    public List<Resultat> getAllResultats() {
        return resultatService.getAllResultats();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resultat> getResultatById(@PathVariable Long id) {
        Resultat resultat = resultatService.getResultatById(id);
        if (resultat != null) {
            return new ResponseEntity<>(resultat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Resultat> addResultat(@RequestBody Resultat resultat) {
        Resultat addedresultat = resultatService.addResultat(resultat);
        return new ResponseEntity<>(addedresultat, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resultat> updateResultat(@PathVariable Long id, @RequestBody Resultat resultat) {
        Resultat updatedResultat = resultatService.updateResultat(id, resultat);
        if (updatedResultat != null) {
            return new ResponseEntity<>(updatedResultat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteResultat(@PathVariable Long id) {
        boolean deleted = resultatService.deleteResultat(id);
        if (deleted) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
