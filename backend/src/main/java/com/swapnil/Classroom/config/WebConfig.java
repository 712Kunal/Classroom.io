package com.swapnil.Classroom.config;


import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.w3c.dom.ls.LSOutput;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    @Value("${frontend.url}")
    private String frontUrl;

    @Override
    public  void addCorsMappings(CorsRegistry registry){

        registry.addMapping("/**")
                .allowedOrigins(frontUrl)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);;
    }
}
