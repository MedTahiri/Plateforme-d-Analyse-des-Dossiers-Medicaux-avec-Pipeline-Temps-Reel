package org.project.backend.controller;

import org.project.backend.service.FileStorageService;
import org.project.backend.service.PDFExtractionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*") // Consider restricting this in production
public class FileUploadController {



    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    // Maximum file size (10MB)
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private final FileStorageService fileStorageService;
    private final PDFExtractionService pdfExtractionService;

    @Autowired
    public FileUploadController(FileStorageService fileStorageService,
                                PDFExtractionService pdfExtractionService) {
        this.fileStorageService = fileStorageService;
        this.pdfExtractionService = pdfExtractionService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate file
            String validationError = validateFile(file);
            if (validationError != null) {
                response.put("status", "error");
                response.put("message", validationError);
                return ResponseEntity.badRequest().body(response);
            }

            String fileName = fileStorageService.storeFile(file);
            logger.info("File uploaded successfully: {}", fileName);

            response.put("status", "success");
            response.put("message", "File uploaded successfully");
            response.put("filename", fileName);
            response.put("fileSize", file.getSize());
            response.put("originalName", file.getOriginalFilename());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error uploading file: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/upload-and-process")
    public ResponseEntity<Map<String, Object>> uploadAndProcessFile(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate file
            String validationError = validateFile(file);
            if (validationError != null) {
                response.put("status", "error");
                response.put("message", validationError);
                return ResponseEntity.badRequest().body(response);
            }

            // Store file
            String fileName = fileStorageService.storeFile(file);
            logger.info("File uploaded: {}", fileName);

            // Process PDF immediately
            int recordsProcessed = pdfExtractionService.processPDF(fileName);
            logger.info("PDF processed successfully. Records: {}", recordsProcessed);

            response.put("status", "success");
            response.put("message", "File uploaded and processed successfully");
            response.put("filename", fileName);
            response.put("recordsProcessed", recordsProcessed);
            response.put("fileSize", file.getSize());
            response.put("originalName", file.getOriginalFilename());

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            logger.error("Error processing PDF: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Error processing PDF: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/process/{filename}")
    public ResponseEntity<Map<String, Object>> processPdfFile(@PathVariable String filename) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Sanitize filename to prevent path traversal
            if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
                response.put("status", "error");
                response.put("message", "Invalid filename");
                return ResponseEntity.badRequest().body(response);
            }

            int recordsProcessed = pdfExtractionService.processPDF(filename);
            logger.info("PDF processed successfully: {} records", recordsProcessed);

            response.put("status", "success");
            response.put("message", "PDF processed successfully");
            response.put("recordsProcessed", recordsProcessed);
            response.put("filename", filename);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            logger.error("Error processing PDF {}: {}", filename, e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Error processing PDF: " + e.getMessage());
            response.put("filename", filename);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            logger.error("Unexpected error processing PDF {}: {}", filename, e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/read/{filename}")
    public ResponseEntity<Map<String, Object>> readPdfContent(@PathVariable String filename) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Sanitize filename
            if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
                response.put("status", "error");
                response.put("message", "Invalid filename");
                return ResponseEntity.badRequest().body(response);
            }

            String content = fileStorageService.readFile(filename);
            if (content == null) {
                response.put("status", "error");
                response.put("message", "File not found or not a valid PDF");
                return ResponseEntity.notFound().build();
            }

            response.put("status", "success");
            response.put("message", "PDF content read successfully");
            response.put("filename", filename);
            response.put("content", content);
            response.put("contentLength", content.length());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error reading PDF {}: {}", filename, e.getMessage(), e);
            response.put("status", "error");
            response.put("message", "Error reading PDF: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Validates the uploaded file
     */
    private String validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return "Please select a file to upload";
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return "File size exceeds maximum limit of " + (MAX_FILE_SIZE / (1024 * 1024)) + "MB";
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.toLowerCase().endsWith(".pdf")) {
            return "Only PDF files are allowed";
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            return "Invalid file type. Expected PDF file";
        }

        return null; // No validation errors
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception e) {
        logger.error("Unhandled exception in FileUploadController: {}", e.getMessage(), e);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", "An unexpected error occurred");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}