package org.project.backend.controller;

import org.project.backend.entities.DME;
import org.project.backend.service.DMEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api/dme")
public class DMEController {
    @Autowired
    DMEService dmeService ;

}
