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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class TaskController {

    private final Firestore firestore;
    private final PathwayService pathwayService;
    private final NotificationService notificationService;
    private static final Logger logger = LoggerFactory.getLogger(PathwayController.class);



    @PostMapping("/pathway/{pathwayId}/task/{taskId}")
    public ResponseEntity<String> emailSentForTaskCompletion(
            @PathVariable String pathwayId,
            @PathVariable Long taskId

    ) throws Exception {

        String userId = pathwayService.getUserIdFromPathwayId(pathwayId);

        System.out.println("User ID: "+userId);
        DocumentReference userDoc=firestore.collection("UserRegistration").document(userId);

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
                sendEmailAndNotification(userId, taskId, notification, pathwayId);
                return ResponseEntity.ok("Email and Notification sent successfully");
            } else {

                notification.setNotificationType(Notification.NotificationType.IN_APP);
                System.out.println("Sending in-app notifications");
                sendNotificationOnly(userId, taskId, notification, pathwayId);
                return ResponseEntity.ok("Notification sent successfully");
            }
        } catch (Exception e) {
            logger.error("Error sending email/notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in sending the email and notification");


        }
    }


    //Notification and Email reminders
    public void sendEmailAndNotification(String userId, Long taskId, Notification notification, String pathwayId){

        notificationService.sendTaskCompletionNotification(userId, taskId, notification, pathwayId);
        pathwayService.taskCompletionEmail(pathwayId, taskId);

    }

    //Notification reminder only
    public void sendNotificationOnly(String userId, Long taskId, Notification notification, String pathwayId){
        notificationService.sendTaskCompletionNotification(userId, taskId,notification, pathwayId);
    }
}
