package kr.stockey.laboratoryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class LaboratoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LaboratoryServiceApplication.class, args);
    }

}
