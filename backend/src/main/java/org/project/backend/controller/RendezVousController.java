package org.project.backend.controller;

import org.project.backend.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {
    @Autowired
    RendezVousService rendezVousService;
}
