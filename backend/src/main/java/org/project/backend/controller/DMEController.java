package org.project.backend.controller;

import org.project.backend.entities.DME;
import org.project.backend.service.DMEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/dme")
public class DMEController {
    @Autowired
    private DMEService dmeService;

    @GetMapping
    public List<DME> getAllDmes() {
        return dmeService.getAllDmes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DME> getDmeById(@PathVariable Long id) {
        DME dme = dmeService.getDmeById(id);
        if (dme != null) {
            return new ResponseEntity<>(dme, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<DME> addDme(@RequestBody DME dme) {
        DME addedDme = dmeService.addDme(dme);
        return new ResponseEntity<>(addedDme, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DME> updateDme(@PathVariable Long id, @RequestBody DME dme) {
        DME updatedDme = dmeService.updateDme(id, dme);
        if (updatedDme != null) {
            return new ResponseEntity<>(updatedDme, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteDme(@PathVariable Long id) {
        boolean deleted = dmeService.deleteDme(id);
        if (deleted) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}
