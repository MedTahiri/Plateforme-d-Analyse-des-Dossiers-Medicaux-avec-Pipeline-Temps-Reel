package org.project.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        //.requestMatchers("/api/dme/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/api/medecins/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/api/patients/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/api/rendezvous/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/api/resultat/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/api/secretaires/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/api/files/**").hasAnyRole("ADMIN","MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        //.requestMatchers("/auth/**").permitAll()
                        //.anyRequest().authenticated()
                         .anyRequest().permitAll()
                )
                .formLogin(AbstractHttpConfigurer::disable) // pas de page HTML de login
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS activé
                .httpBasic(AbstractHttpConfigurer::disable); // Auth HTTP simple (ou à remplacer par JWT plus tard)

        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // ou ton domaine front
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }



    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
