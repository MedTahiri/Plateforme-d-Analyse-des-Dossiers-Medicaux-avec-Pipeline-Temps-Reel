package org.project.backend.Alerte;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.project.backend.DTO.AlerteDTO;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;



@Service
public class ProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public ProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public void producer(String message) {
        kafkaTemplate.send("alert1", message);
        System.out.println("✅ Message envoyé : " + message);
    }

    public void producer(long id, String message) {
        kafkaTemplate.send("alerte2", String.valueOf(id), message);
        System.out.println("✅ Message envoyé avec : " + message + " son id : " + id);
    }

    public void producer(long id, AlerteDTO alerteDTO, String topic) throws JsonProcessingException {
        String jsonValue = objectMapper.writeValueAsString(alerteDTO);
        kafkaTemplate.send(topic, String.valueOf(id), jsonValue);
        System.out.println("✅ Message envoyé : " + alerteDTO.toString() + " son id : " + id);
    }
}