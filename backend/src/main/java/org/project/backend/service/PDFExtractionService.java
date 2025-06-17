package org.project.backend.service;

import org.project.backend.entities.*;
import org.project.backend.repository.*;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.project.backend.entities.DME;
import org.project.backend.entities.Indicateur;
import org.project.backend.entities.Patient;
import org.project.backend.entities.Resultat;
import org.project.backend.repository.DMERepository;
import org.project.backend.repository.IndicateurJPA;
import org.project.backend.repository.PatientRepository;
import org.project.backend.repository.ResultatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@Service
@Transactional
public class PDFExtractionService {

    private static final Logger logger = LoggerFactory.getLogger(PDFExtractionService.class);
    private static final int MAX_ERRORS = 3;

    private final Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
    private final PatientRepository patientRepo;
    private final DMERepository dmeRepo;
    private final IndicateurJPA indicateurRepo;
    private final ResultatRepository resultatRepo;

    @Autowired
    public PDFExtractionService(PatientRepository patientRepo, DMERepository dmeRepo,
                                IndicateurJPA indicateurRepo, ResultatRepository resultatRepo) {
        this.patientRepo = patientRepo;
        this.dmeRepo = dmeRepo;
        this.indicateurRepo = indicateurRepo;
        this.resultatRepo = resultatRepo;
        createUploadDir();
    }

    private void createUploadDir() {
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            logger.error("Could not create upload directory", e);
        }
    }

    @Transactional
    public int processPDF(String filename) throws IOException {
        Path filePath = uploadDir.resolve(filename).normalize();

        if (!Files.exists(filePath)) {
            throw new IOException("File not found: " + filename);
        }

        try (PDDocument doc = PDDocument.load(filePath.toFile())) {
            String text = new PDFTextStripper().getText(doc);
            logger.info("Contenu PDF extrait :\n{}", text);
            parseAndSave(text);
        }
        return 1;
    }

    private void parseAndSave(String content) throws IOException {
        String[] lines = content.split("\\r?\\n");
        int errors = 0;
        DME currentDme = null;

        for (int i = 0; i < lines.length; i++) {
            try {
                String line = lines[i].trim();

                if (line.startsWith("Patient ID:")) {
                    currentDme = handlePatient(lines, i);
                    i++; // Skip DOB line
                } else if (line.startsWith("Indicateur:") && currentDme != null) {
                    handleIndicator(lines, i, currentDme);
                    i += 2; // Skip value and unit lines
                }
            } catch (Exception e) {
                if (++errors > MAX_ERRORS) {
                    throw new IOException("Too many errors (" + errors + ") while processing");
                }
                logger.warn("Processing error at line {}: {}", i + 1, e.getMessage());
            }
        }
    }

    private DME handlePatient(String[] lines, int idx) throws IOException {
        long patientId = Long.parseLong(extractValue(lines[idx], "Patient ID:"));
        LocalDate dob = LocalDate.parse(extractValue(lines[idx + 1], "Date de Naissance:"));

        Patient patient = patientRepo.findById(patientId).orElse(null);
        if (patient == null) {
            logger.info("Nouveau patient créé (ID inconnu), Date naissance = {}", dob);
            patient = new Patient();
            patient.setDate_naissance(dob);
            patient = patientRepo.save(patient);
        } else {
            logger.info("Patient trouvé avec ID = {}", patientId);
        }

        DME dme = new DME();
        dme.setDate_creation(LocalDate.now());
        dme.setPatient(patient);
        dme = dmeRepo.save(dme);
        logger.info("DME créé avec ID={} pour patient ID={}", dme.getId(), patient.getId());

        return dme;
    }

    private void handleIndicator(String[] lines, int idx, DME dme) throws IOException {
        String name = extractValue(lines[idx], "Indicateur:");
        double value = Double.parseDouble(extractValue(lines[idx + 1], "Valeur:"));
        String unit = extractValue(lines[idx + 2], "Unité:");

        Indicateur indicator = indicateurRepo.findByNom(name);

        if (indicator == null) {
            indicator = new Indicateur();
            indicator.setNom(name);
            indicator.setUnite(unit);
            indicator = indicateurRepo.save(indicator);
            logger.info("✅ Nouvel indicateur enregistré : {} ({})", name, unit);
        } else {
            logger.info("🔁 Indicateur déjà existant trouvé : {} ({})", name, indicator.getUnite());
        }

        Resultat result = new Resultat();
        result.setValeur(value);
        result.setDateMesure(LocalDate.now());
        result.setDossier(dme);
        result.setIndicateur(indicator);
        resultatRepo.save(result);

        logger.info("💾 Résultat sauvegardé : {} = {} {}", name, value, indicator.getUnite());
    }


    private String extractValue(String line, String prefix) {
        return line.substring(prefix.length()).trim();
    }
}
