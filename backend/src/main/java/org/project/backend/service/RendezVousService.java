package org.project.backend.service;

import org.project.backend.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RendezVousService {
    @Autowired
    RendezVousRepository rendezVousRepository;
}
