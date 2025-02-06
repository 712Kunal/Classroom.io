package com.swapnil.Classroom.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.swapnil.Classroom.entity.Notification;
import com.swapnil.Classroom.service.NotificationService;
import com.swapnil.Classroom.service.PathwayService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PathwayController {

    private final Firestore firestore;
    private final PathwayService pathwayService;
    private final NotificationService notificationService;
    private static final Logger logger = LoggerFactory.getLogger(PathwayController.class);


//    @PostMapping("/createPathway")
//    public ResponseEntity<String> createPathway(@RequestBody Pathway pathway){
//
//        try{
//            pathwayService.createPathway(pathway);
//            return ResponseEntity.ok("Pathway created successfully");
//        }
//        catch (Exception e){
//            return ResponseEntity.status(500).body("Error creating pathway: "+e.getMessage());
//        }
//
//    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<?> getPathwaysByUser(@PathVariable String userId) {
//        try {
//            List<Pathway> pathways = pathwayService.getPathwaysByUser(userId);
//            if (pathways.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No pathways found for user: " + userId);
//            }
//            return ResponseEntity.ok(pathways);
//        } catch (ExecutionException | InterruptedException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving pathways: " + e.getMessage());
//        }
//    }



    @PostMapping("/user/{userId}/firstPathway/{pathwayId}")
    public ResponseEntity<String> firstPathwayGenerated(
            @PathVariable  String userId,
            @PathVariable  String pathwayId
    ) throws ExecutionException, InterruptedException {


        DocumentReference userDoc=firestore.collection("UserProfiles").document(userId);

        ApiFuture<DocumentSnapshot> future = userDoc.get();
        DocumentSnapshot document = future.get();



        Notification notification=new Notification();


        if (document == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found for the user");
        }

        Boolean emailNotif= (Boolean) document.get("emailNotification");
        try {
            if (Boolean.TRUE.equals(emailNotif)) {


                System.out.println("Sending email and in-app notifications");
                notification.setNotificationType(Notification.NotificationType.BOTH);
                sendEmailAndNotificationForGeneratingFirstPathway(userId, notification, pathwayId);
                return ResponseEntity.ok("Email and Notification sent successfully");
            } else {

                notification.setNotificationType(Notification.NotificationType.IN_APP);
                System.out.println("Sending in-app notifications");
                sendNotificationOnlyForGeneratingFirstPathway(userId, notification, pathwayId);
                return ResponseEntity.ok("Notification sent successfully");
            }
        } catch (Exception e) {
            logger.error("Error sending email/notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email and notification");


        }
    }
    public void sendEmailAndNotificationForGeneratingFirstPathway(String userId, Notification notification, String pathwayId) throws ExecutionException, InterruptedException {

        notificationService.sendFirstPathwayGenerationNotification(userId,  notification, pathwayId);
        pathwayService.sendFirstPathwayGenerationEmail(userId, pathwayId);

    }

    public void sendNotificationOnlyForGeneratingFirstPathway(String userId, Notification notification, String pathwayId){
        notificationService.sendFirstPathwayGenerationNotification(userId ,notification, pathwayId);

    }

    @PostMapping("/user/{userId}/pathwayActivate/{pathwayId}")
    public ResponseEntity<String> pathwayActivationNotification(
            @PathVariable  String userId,
            @PathVariable  String pathwayId
    ) throws ExecutionException, InterruptedException {


        DocumentReference userDoc=firestore.collection("UserProfiles").document(userId);

        ApiFuture<DocumentSnapshot> future = userDoc.get();
        DocumentSnapshot document = future.get();



        Notification notification=new Notification();


        if (document == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found for the user");
        }

        Boolean emailNotif= (Boolean) document.get("emailNotification");
        try {
            if (Boolean.TRUE.equals(emailNotif)) {


                System.out.println("Sending email and in-app notifications");
                notification.setNotificationType(Notification.NotificationType.BOTH);
                sendEmailAndNotificationForActivatingPathway(userId, notification, pathwayId);
                return ResponseEntity.ok("Email and Notification sent successfully");
            } else {

                notification.setNotificationType(Notification.NotificationType.IN_APP);
                System.out.println("Sending in-app notifications");
                sendNotificationOnlyForActivatingPathway(userId, notification, pathwayId);
                return ResponseEntity.ok("Notification sent successfully");
            }
        } catch (Exception e) {
            logger.error("Error sending email/notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email and notification");


        }
    }

    public void sendEmailAndNotificationForActivatingPathway(String userId, Notification notification, String pathwayId) throws ExecutionException, InterruptedException {

        notificationService.sendPathwayActivationNotification(userId,  notification, pathwayId);
        pathwayService.sendPathwayActivationEmail(userId, pathwayId);

    }

    public void sendNotificationOnlyForActivatingPathway(String userId, Notification notification, String pathwayId){
        notificationService.sendPathwayActivationNotification(userId ,notification, pathwayId);

    }



    @PostMapping("/user/{userId}/pathwayComplete/{pathwayId}")
    public ResponseEntity<String> pathwayCompletionNotification(
            @PathVariable  String userId,
            @PathVariable  String pathwayId
    ) throws ExecutionException, InterruptedException {


        DocumentReference userDoc=firestore.collection("UserProfiles").document(userId);

        ApiFuture<DocumentSnapshot> future = userDoc.get();
        DocumentSnapshot document = future.get();



        Notification notification=new Notification();


        if (document == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found for the user");
        }

        Boolean emailNotif= (Boolean) document.get("emailNotification");
        try {
            if (Boolean.TRUE.equals(emailNotif)) {


                System.out.println("Sending email and in-app notifications");
                notification.setNotificationType(Notification.NotificationType.BOTH);
                sendEmailAndNotificationForCompletingPathway(userId, notification, pathwayId);
                return ResponseEntity.ok("Email and Notification sent successfully");
            } else {

                notification.setNotificationType(Notification.NotificationType.IN_APP);
                System.out.println("Sending in-app notifications");
                sendNotificationOnlyForCompletingPathway(userId, notification, pathwayId);
                return ResponseEntity.ok("Notification sent successfully");
            }
        } catch (Exception e) {
            logger.error("Error sending email/notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email and notification");


        }
    }

    public void sendEmailAndNotificationForCompletingPathway(String userId, Notification notification, String pathwayId) throws ExecutionException, InterruptedException {

        notificationService.sendPathwayCompletionNotification(userId,  notification, pathwayId);
        pathwayService.sendPathwayCompletionEmail(userId, pathwayId);



    }

    //Notification reminder only
    public void sendNotificationOnlyForCompletingPathway(String userId, Notification notification, String pathwayId){
        notificationService.sendPathwayCompletionNotification(userId ,notification, pathwayId);

    }

    @PostMapping("/user/{userId}/pathway/{pathwayId}")
    public ResponseEntity<String> pathwayProgressNotification(
            @PathVariable  String userId,
            @PathVariable  String pathwayId,
            @RequestParam("progress") int progressPercentage  // 0 to 100

    ) throws ExecutionException, InterruptedException {


        if (progressPercentage < 0 || progressPercentage > 100) {
            return ResponseEntity.badRequest().body("Progress percentage must be between 0 and 100.");
        }

        DocumentReference userDoc=firestore.collection("UserProfiles").document(userId);

        ApiFuture<DocumentSnapshot> future = userDoc.get();
        DocumentSnapshot document = future.get();



        Notification notification=new Notification();


        if (document == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found for the user");
        }

        Boolean emailNotif= (Boolean) document.get("emailNotification");
        try {
            if (Boolean.TRUE.equals(emailNotif)) {


                System.out.println("Sending email and in-app notifications");
                notification.setNotificationType(Notification.NotificationType.BOTH);
                sendEmailAndNotificationForPathwayProgress(userId, notification, pathwayId, progressPercentage);
                return ResponseEntity.ok("Email and Notification sent successfully");
            } else {

                notification.setNotificationType(Notification.NotificationType.IN_APP);
                System.out.println("Sending in-app notifications");
                sendNotificationOnlyForPathwayProgress(userId, notification, pathwayId, progressPercentage);
                return ResponseEntity.ok("Notification sent successfully");
            }
        } catch (Exception e) {
            logger.error("Error sending email/notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email and notification");


        }
    }

    public void sendEmailAndNotificationForPathwayProgress(String userId, Notification notification, String pathwayId, int progressPercentage) throws ExecutionException, InterruptedException {

        notificationService.sendPathwayProgressNotification(userId,  notification, pathwayId, progressPercentage);
        pathwayService.sendPathwayProgressEmail(userId, pathwayId, progressPercentage);



    }

    //Notification reminder only
    public void sendNotificationOnlyForPathwayProgress(String userId, Notification notification, String pathwayId, int progressPercentage){
        notificationService.sendPathwayProgressNotification(userId ,notification, pathwayId, progressPercentage);

    }




}
