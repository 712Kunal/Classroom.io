package com.swapnil.Classroom.service;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.database.GenericTypeIndicator;
import com.swapnil.Classroom.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final Firestore firestore;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
    private final PathwayService pathwayService;

    public void save(Notification notification){

        try {
            firestore.collection("notifications")
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


    public void sendTaskCompletionNotification(String userId, Long taskId, Notification notification, String pathwayId) {


        String taskTitle = getTaskTitleByTaskNumber(pathwayId, taskId);
        String description = String.format(
                "Congratulations!\n You've successfully completed the task: '%s'.",
                taskTitle
        );



        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.TASK);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setRelatedEntity(String.valueOf(taskId));
            notification.setDescription(description);

            save(notification);

            logger.info("Notification send for taskId: "+taskId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending task completion notification", e);
        }
    }



    public String getTaskTitleByTaskNumber(String pathwayId, Long taskNumber) {
        try {
            ApiFuture<DocumentSnapshot> future = firestore.collection("pathways").document(pathwayId).get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                GenericTypeIndicator<Map<String, Object>> responseType = new GenericTypeIndicator<Map<String, Object>>() {};
                Map<String, Object> response = (Map<String, Object>) document.get("response");

                GenericTypeIndicator<List<Map<String, Object>>> pathwayType = new GenericTypeIndicator<List<Map<String, Object>>>() {};
                List<Map<String, Object>> pathwayList = (List<Map<String, Object>>) response.get("pathway");

                for (Map<String, Object> interval : pathwayList) {
                    List<Map<String, Object>> tasks = (List<Map<String, Object>>) interval.get("tasks");

                    for (Map<String, Object> task : tasks) {
                        Long taskNum = (Long) task.get("taskNumber");
                        if (taskNum == taskNumber) {
                            return (String) task.get("taskTitle");
                        }
                    }
                }
            } else {
                System.out.println("Pathway with ID " + pathwayId + " not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void sendPathwayActivationNotification(String userId, Notification notification, String pathwayId) {

        System.out.println("Sending notification");
        String pathwayDescription="";
        Map<String, Object> pathwayData = pathwayService.getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }


        System.out.println("Pathway Description: "+pathwayDescription);
        String description = String.format(
                "Welcome!\n You've activated the pathway: '%s'. Good luck on your journey!",
                pathwayDescription
        );


        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.PATHWAY);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setRelatedEntity(String.valueOf(pathwayId));
            notification.setDescription(description);

            save(notification);

            logger.info("Notification send for pathwayId: "+pathwayId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending pathway activation notification", e);
        }



    }

    public void sendPathwayCompletionNotification(String userId, Notification notification, String pathwayId) {

        System.out.println("Sending notification");
        String pathwayDescription="";
        Map<String, Object> pathwayData = pathwayService.getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }


        System.out.println("Pathway Description: " + pathwayDescription);
        String description = String.format(
                "🎉 Congratulations! 🎉\n" +
                        "You've successfully completed the pathway: '%s'. 🎊\n" +
                        "Well done on finishing the journey! 🚀",
                pathwayDescription
        );




        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.PATHWAY);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setRelatedEntity(String.valueOf(pathwayId));
            notification.setDescription(description);

            save(notification);

            logger.info("Notification send for pathwayID: "+pathwayId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending pathway completion notification", e);
        }
    }

    public void sendFirstPathwayGenerationNotification(String userId, Notification notification, String pathwayId) {

        System.out.println("Sending notification");
        String pathwayDescription="";
        Map<String, Object> pathwayData = pathwayService.getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }


        System.out.println("Pathway Description: " + pathwayDescription);
        String description = String.format(
                "🎉 Congratulations! 🎉\n\n" +
                        "Your first personalized pathway '%s' has been successfully created. 🚀\n\n" +
                        "Best of luck! 🍀\n",
                pathwayDescription
        );




        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.PATHWAY);
            notification.setNotificationSendDate(notificationSendDate);

            notification.setRelatedEntity(String.valueOf(pathwayId));
            notification.setDescription(description);

            save(notification);

            logger.info("Notification send for pathwayId: "+pathwayId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending pathway progress notification", e);
        }
    }

    public void sendPathwayProgressNotification(String userId, Notification notification, String pathwayId, int progressPercentage) {

        System.out.println("Sending notification");
        String pathwayDescription="";
        Map<String, Object> pathwayData = pathwayService.getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }


        System.out.println("Pathway Description: " + pathwayDescription);
        String description = String.format(
                "🎉 Great progress! 🎉\n\n" +
                        "%d%% done with your pathway: '%s'. Keep it up! 💪🚀\n\n" ,
                progressPercentage, pathwayDescription
        );





        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.PATHWAY);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setRelatedEntity(String.valueOf(pathwayId));
            notification.setDescription(description);

            save(notification);

            logger.info("Notification send for pathwayId: "+pathwayId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending pathway progress notification", e);
        }
    }

    public void sendTaskDeadlineNotification(String taskTitle, Notification notification, String userEmail, QueryDocumentSnapshot pathwayDoc) {


        System.out.println("Sending notification");

        String pathwayTopic= (String) pathwayDoc.get("topic");
        String pathwayId= (String) pathwayDoc.get("pathwayId");
        String userId= (String) pathwayDoc.get("userId");


//        String pathwayDescription="";
//        Map<String, Object> pathwayData = pathwayService.getPathwayById(pathwayId);
//        if(pathwayData!=null){
//            pathwayDescription = (String) pathwayData.get("description");
//
//        }


//        System.out.println("Pathway Description: " + pathwayDescription);
        String description = String.format(
                "⏳ Task Reminder! ⏳\n\n" +
                        "Your task **'%s'** is due today as part of your pathway: **'%s'**.\n\n" +
                        "❗ If not completed by the deadline, it will be marked **Late** in your tracker.\n\n" +
                taskTitle, pathwayTopic
        );




        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(Notification.NotificationReason.PATHWAY);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setRelatedEntity(String.valueOf(pathwayId));
            notification.setDescription(description);

            save(notification);

            logger.info("Notification send for pathwayId: "+pathwayId+" to userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending pathway progress notification", e);
        }
    }
}
