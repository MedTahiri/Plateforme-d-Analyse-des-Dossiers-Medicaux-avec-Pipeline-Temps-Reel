package org.project.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.project.backend.entities.LoginRequest;
import org.project.backend.entities.Utilisateur;
import org.project.backend.repository.UtilisateurRepository;
import org.project.backend.security.CustomUserDetailsService;
import org.project.backend.service.AdminService;
import org.project.backend.service.MedecinService;
import org.project.backend.service.PatientService;
import org.project.backend.service.SecretaireMedicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PatientService patientService;
    @Autowired
    private MedecinService medecinService;
    @Autowired
    private SecretaireMedicalService secretaireMedicalService;
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // Set authentication in context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Create session (JSESSIONID)
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        String username = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        Object user = null;
        String matchedRole = null;

        if (hasRole(authorities, "ROLE_ADMIN")) {
            user = adminService.getAdminByUsername(username);
            matchedRole = "ROLE_ADMIN";
        } else if (hasRole(authorities, "ROLE_PATIENT")) {
            user = patientService.getPatientByUsername(username);
            matchedRole = "ROLE_PATIENT";
        } else if (hasRole(authorities, "ROLE_MEDECIN")) {
            user = medecinService.getMedecinByUsername(username);
            matchedRole = "ROLE_MEDECIN";
        } else if (hasRole(authorities, "ROLE_SECRETAIRE_MEDICAL")) {
            user = secretaireMedicalService.getSecretaireMedicalByUsername(username);
            matchedRole = "ROLE_SECRETAIRE_MEDICAL";
        }

        if (user == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User role not recognized");
        }

        return ResponseEntity.ok(Map.of(
                "role", matchedRole,
                "user", user
        ));
    }
    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        Object user = null;
        String matchedRole = null;

        if (hasRole(authorities, "ROLE_ADMIN")) {
            user = adminService.getAdminByUsername(username);
            matchedRole = "ROLE_ADMIN";
        } else if (hasRole(authorities, "ROLE_PATIENT")) {
            user = patientService.getPatientByUsername(username);
            matchedRole = "ROLE_PATIENT";
        } else if (hasRole(authorities, "ROLE_MEDECIN")) {
            user = medecinService.getMedecinByUsername(username);
            matchedRole = "ROLE_MEDECIN";
        } else if (hasRole(authorities, "ROLE_SECRETAIRE_MEDICAL")) {
            user = secretaireMedicalService.getSecretaireMedicalByUsername(username);
            matchedRole = "ROLE_SECRETAIRE_MEDICAL";
        }

        if (user == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User role not recognized");
        }

        return ResponseEntity.ok(Map.of(
                "role", matchedRole,
                "user", user
        ));
    }

    private boolean hasRole(Collection<? extends GrantedAuthority> authorities, String role) {
        return authorities.stream().anyMatch(a -> a.getAuthority().equals(role));
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return "Logged out";
    }
}

