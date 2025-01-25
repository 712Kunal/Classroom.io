package com.swapnil.Classroom.service;


import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.swapnil.Classroom.controller.PathwayController;
import com.swapnil.Classroom.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final Firestore firestore;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);


    public void save(Notification notification){

        try {
            firestore.collection("userNotification")
                    .document(notification.getNotificationId())
                    .set(notification)
                    .get();

            System.out.println("Notification saved successfully with ID: " + notification.getNotificationId());

        }
        catch (Exception e){
            System.err.println("Error saving notification: "+ e.getMessage());

        }



    }

    public List<Map<String, Object>> getNotificationByUserId(String userId) throws ExecutionException, InterruptedException {

            QuerySnapshot querySnapshot = firestore.collection("userNotification")
                    .whereEqualTo("userId", userId)
                    .get()
                    .get();

            if(querySnapshot.isEmpty()){
                System.out.println("No Notification found for the user: "+userId);
                return List.of();
            }

            return querySnapshot.getDocuments()
                    .stream()
                    .map(doc-> doc.getData())
                    .toList();

    }


    public void sendTaskCompletionNotification(String userId, Long taskId, Notification notification) {


        try{

            String notificationId="notif"+taskId+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.TASK);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setNotificationReadDate(null);
            notification.setRelatedEntity(String.valueOf(taskId));
            notification.setDescription("You have completed a task!");

            save(notification);

            logger.info("Notification send for taskId: "+taskId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending task completion notification", e);
        }
    }
}
