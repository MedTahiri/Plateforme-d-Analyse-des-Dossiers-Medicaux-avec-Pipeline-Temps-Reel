package org.project.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/dme/**").hasAnyRole("MEDECIN")
                        .requestMatchers("/api/medecins/**").hasAnyRole("ADMIN")
                        .requestMatchers("/api/patients/**").hasAnyRole("SECRETAIRE_MEDICAL")
                        .requestMatchers("/api/rendezvous/**").hasAnyRole("SECRETAIRE_MEDICAL")
                        .requestMatchers("/api/resultat/**").hasAnyRole("MEDECIN","SECRETAIRE_MEDICAL","PATIENT")
                        .requestMatchers("/api/secretaires/**").hasAnyRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll
                )
                .httpBasic(httpBasic -> {});

        return http.build();
    }



    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
