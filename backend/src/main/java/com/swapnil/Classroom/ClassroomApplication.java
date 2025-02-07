package com.swapnil.Classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;



@SpringBootApplication
@EnableScheduling
@EnableAsync
public class ClassroomApplication {

	public static void main(String[] args) {


		SpringApplication.run(ClassroomApplication.class, args);

	}

}
