package com.swapnil.Classroom.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.swapnil.Classroom.entity.Notification;
import com.swapnil.Classroom.entity.UserRegistration;
import com.swapnil.Classroom.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final Firestore firestore;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegistration userRegistration){

        try{
            String response= userService.registerUser(userRegistration);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: "+e.getMessage());
        }
    }

    // Fetch user by username
    @GetMapping("/{username}")
    public UserRegistration getUserByUsername(@PathVariable String username) throws ExecutionException, InterruptedException {

        UserRegistration user=userService.getUserByUsername(username);
        System.out.println("Username: "+user.getUsername());
        return user;
    }






    // Update an existing user
    @PutMapping("/{username}")
    public void updateUser(@PathVariable String username, @RequestBody UserRegistration user) throws ExecutionException, InterruptedException {
        user.setUsername(username);
        userService.updateUser(user);
    }

    @PostMapping("/user-signUp/{userId}")
    public ResponseEntity<String> sendUserSignupNotification(
            @PathVariable String userId
    ) throws ExecutionException, InterruptedException {

        try{
            DocumentReference docRef = firestore.collection("Users").document(userId);
            DocumentSnapshot document = docRef.get().get();

            String userEmail= document.getString("email");


            if(userEmail==null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User email not found with: "+userId);

            }




            System.out.println("Sending email and in-app notifications");
//          notification.setNotificationType(Notification.NotificationType.BOTH);
            sendEmailAndNotification(userId, userEmail);
            return ResponseEntity.ok("Email and Notification sent successfully");



        } catch (Exception e) {
            logger.error("Error sending email/notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email and notification");


        }

    }


    //Notification and Email reminders
    public void sendEmailAndNotification(String userId, String userEmail) throws MessagingException, ExecutionException, InterruptedException {

        userService.sendUserSignupNotification(userId);
        userService.sendUserSignupEmail(userId, userEmail);

    }



    @PostMapping("/user/forgot-password")
    public ResponseEntity<String> forgotPasswordNotification(
            @RequestParam String userId,
            @RequestParam String userEmail
    ){

        if(userId==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Id not found with: "+userId);

        }

        if(userEmail==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User email not found with: "+userEmail);
        }

        try{

            System.out.println("Sending email for forget password");
            userService.sendForgotPasswordEmailAndUpdateCode(userId, userEmail);
            return ResponseEntity.ok("Email sent successfully");



        } catch (Exception e) {
            logger.error("Error sending email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email");


        }


    }


    @PostMapping("/user/{userId}/reset-password/{code}")
    public ResponseEntity<String> resetUserPassword(
            @PathVariable String userId,
            @PathVariable Long code
    ){

        if(userId==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Id not found with: "+userId);

        }
        try{

            System.out.println("Checking user code");
            userService.resetUserPassword(userId, code);
            return ResponseEntity.ok("Password reset successfully");



        } catch (Exception e) {
            logger.error("Error resetting password", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting password");


        }


    }




}
