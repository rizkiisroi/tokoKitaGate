package com.alam.tokokitagate.web.rest;

import com.alam.tokokitagate.service.TokoKitaGateKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/toko-kita-gate-kafka")
public class TokoKitaGateKafkaResource {

    private final Logger log = LoggerFactory.getLogger(TokoKitaGateKafkaResource.class);

    private TokoKitaGateKafkaProducer kafkaProducer;

    public TokoKitaGateKafkaResource(TokoKitaGateKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping("/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.send(message);
    }
}
