package org.project.backend.controller;

import org.project.backend.service.SecretaireMedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecretaireMedicalController {
    @Autowired
    SecretaireMedicalService secretaireMedicalService;
}