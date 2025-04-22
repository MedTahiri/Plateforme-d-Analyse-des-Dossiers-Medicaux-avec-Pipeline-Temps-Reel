package org.project.backend.service;

import org.project.backend.repository.SecretaireMedicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecretaireMedicalService {
    @Autowired
    SecretaireMedicalRepository secretaireMedicalRepository;
}