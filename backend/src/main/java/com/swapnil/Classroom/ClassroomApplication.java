package com.swapnil.Classroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;



@SpringBootApplication
@EnableScheduling
public class ClassroomApplication {

	public static void main(String[] args) {


		SpringApplication.run(ClassroomApplication.class, args);
		System.out.println("FIREBASE_PRIVATE_KEY_PATH: " + System.getenv("FIREBASE_PRIVATE_KEY_PATH"));

	}

}
