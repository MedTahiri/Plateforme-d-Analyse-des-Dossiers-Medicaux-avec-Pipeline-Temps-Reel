package org.project.backend.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import org.project.backend.Alerte.CustomerService;
import org.project.backend.Alerte.KafkaConstants;
import org.project.backend.Alerte.ProducerService;
import org.project.backend.DTO.AlerteDTO;
import org.project.backend.entities.DME;
import org.project.backend.entities.Resultat;
import org.project.backend.entities.SeuilPR;
import org.project.backend.repository.DMERepository;
import org.project.backend.repository.ResultatRepository;
import org.project.backend.repository.SeuilPR_JPA;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceAlerte {
    private DMERepository dme_jpa;
    private ResultatRepository resultat_jpa;
    private SeuilPR_JPA seuilPRJpa;
    private ResultatRepository resultatJPA;
    private ProducerService producer;
    private CustomerService consumer ;

    public ServiceAlerte(CustomerService consumer, ProducerService producer, ResultatRepository resultatJPA, SeuilPR_JPA seuilPRJpa, DMERepository dme_jpa,ResultatRepository resultat_jpa) {
        this.consumer = consumer;
        this.producer = producer;
        this.resultatJPA = resultatJPA;
        this.seuilPRJpa = seuilPRJpa;
        this.dme_jpa = dme_jpa;
        this.resultat_jpa= resultatJPA;
    }

    @Transactional
    public void Alerte(long id, long idPatient) throws JsonProcessingException {
        long id_ind;
        double valeur;
        double seuilMin;
        double seuilMax;
        AlerteDTO alerteDTO=new AlerteDTO();
        DME dme = dme_jpa.getDMEById(id);
        System.out.println("SA ########"+dme.toString());
        System.out.println("1 - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ");
        if (dme!=null){
            System.out.println("SA ########"+dme.toString());
            //List<Resultat>  resultats = dme.getResultatList();
            List<Resultat>  resultats = resultat_jpa.getResultatsByDossier(dme);
            System.out.println("SA ######## befor if"+resultats.toString());
            if (resultats!=null){
                System.out.println("SA ######## after if"+resultats.toString());
                System.out.println("2 - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ");
                for (Resultat resultat:resultats){
                    System.out.println("3 - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ");

                    valeur = resultat.getValeur();
                    id_ind = resultat.getIndicateur().getId_indicateur();
                    //SeuilPR seuilPR =seuilPRJpa.findSeuilPRByIndicateurIdAndPatientId(idPatient,id_ind) ;
                    SeuilPR seuilPR = seuilPRJpa.getSeuilPRByIndicateur_IdAndPatient_Id(id_ind, idPatient);
                    System.out.println("SA ######### : "+seuilPR.toString());
                    alerteDTO.setResultat(resultat);
                    if(seuilPR != null){
                        // affecter seui min et seuilMAX
                        seuilMin = seuilPR.getSeuiMin();
                        seuilMax = seuilPR.getSeuilMax();
                        // comparer les seuils avec la valeur
                        System.out.println("4 - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ");
                        if(valeur > seuilMax || valeur < seuilMin){
                            // si il y a une anomalie declancher une alerte
                            alerteDTO.setSeuilPR(seuilPR);
                            System.out.println("5 - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ");
                            producer.producer(seuilPR.getMedcin().getId(),alerteDTO, KafkaConstants.TOPIC_ALERT_MEDCIN);
                            producer.producer(seuilPR.getPatient().getId(),alerteDTO,KafkaConstants.TOPIC_ALERT_PATIENT);
                            //producer.producer(seuilPR.getMedcin().getId(),alerteDTO);
                            //producer.producer(seuilPR.getPatient().getId_patient(),alerteDTO,KafkaConstants.TOPIC_ALERT_MEDCIN);
                        }

                        // le package alerte contient les deux methode proder et customer
                    }else {
                        // tu doit faire le meme travaille mais cette fois en utilsant le tableau seuil par defaut
                        // mais cette fois il ne declanche pas une alerte en temps reel
                        // il va le stocker dans une tables et le consulte plus tard
                        // tu doit planifier le declanchement des ses alert pour une temps precise chaque jour


                    }
                }
            }
        }
    }
}
