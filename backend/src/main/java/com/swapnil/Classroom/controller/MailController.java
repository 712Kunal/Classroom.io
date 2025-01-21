package com.swapnil.Classroom.controller;

import com.swapnil.Classroom.service.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @GetMapping("/send")
    public String sendEmail(){

        try{
            mailService.sendEmail("swapnildhamal50@gmail.com", "Testing email", "Email from Spring Boot backend");
            return "Email sent successfully";
        }
        catch(MessagingException e){
            return "Failed to sent email: "+e.getMessage();
        }
    }
}
