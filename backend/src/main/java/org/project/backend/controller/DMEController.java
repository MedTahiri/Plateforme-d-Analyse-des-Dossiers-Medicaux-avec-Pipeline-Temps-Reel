package org.project.backend.controller;

import org.project.backend.entities.DME;
import org.project.backend.entities.Patient;
import org.project.backend.service.DMEService;
import org.project.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/dme")
public class DMEController {
    @Autowired
    private DMEService dmeService;

    @Autowired
    private FileStorageService fileStorageService;

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

    @GetMapping("/by-patient/{id}")
    public ResponseEntity<List<DME>> getDmeByPatient(@PathVariable Long id) {
        List<DME> dmes = dmeService.getDmeByPatient(id);
        System.out.println(dmes);
        return new ResponseEntity<>(dmes, HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<DME> addDme(@RequestBody DME dme) {
//        DME addedDme = dmeService.addDme(dme);
//        return new ResponseEntity<>(addedDme, HttpStatus.CREATED);
//    }

    @PostMapping
    public ResponseEntity<DME> ajouteDme(@RequestParam("file") MultipartFile file,@RequestPart("dme") DME dme) {
        String fileName = fileStorageService.storeFile(file);
        return new ResponseEntity<>(dmeService.ajouteDme(dme,fileName), HttpStatus.CREATED);
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

    @GetMapping("file/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


}
