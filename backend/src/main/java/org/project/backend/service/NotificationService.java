package org.project.backend.service;


import org.project.backend.entities.Medecin;
import org.project.backend.entities.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    // injecter la classe SimpMessagingTemplate
    @Autowired
    private final SimpMessagingTemplate simpMessagingTemplate;

    public NotificationService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public void notification(Object object,String userCible,String idUser,String messageEnvoye){

        String message ="";
        // declarer le topic ou celui que vous voulez
        String destination = "/topic/alertes/"+userCible+"/"+idUser;


        if(userCible == "patient") {
            Patient patient = (Patient) object;

            // Si vous envoyez l'objet Client, assurez-vous qu'il n'y a pas de cycles infinis (ex: relation bidirectionnelle sans @JsonIgnore)
             message = "Un nouveau alerte  a été declanché  : " + patient.getId() + " " + patient.getDateNaissance();
        }else if (userCible=="medcin"){

            Medecin medcin = (Medecin) object;
             message = "Un nouveau alerte  a été declanché  : "+medcin.getId() +" "+medcin.getName()+" "+medcin.getPrenom();
        }

        System.out.println("Envoi d'une notification WebSocket à " + destination + ": " + message);
        simpMessagingTemplate.convertAndSend(destination, messageEnvoye); // Ou newClient si vous envoyez l'objet
    }
}