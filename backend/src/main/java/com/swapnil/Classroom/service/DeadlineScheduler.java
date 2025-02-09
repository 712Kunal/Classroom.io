package com.swapnil.Classroom.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.swapnil.Classroom.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DeadlineScheduler {

    private final Firestore firestore;
    private final MailService mailService;
    private final PathwayService pathwayService;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
    private final NotificationService notificationService;

    @Scheduled(cron = "0 25 22 * * *")
    public void checkDeadlineAndSendEmail() {
        System.out.println("Scheduler started...");

        try {
            CollectionReference pathwayCollection = firestore.collection("pathways");
            ApiFuture<QuerySnapshot> pathwayQueryFuture = pathwayCollection.get();
            List<QueryDocumentSnapshot> pathDocs = pathwayQueryFuture.get().getDocuments();

            for (QueryDocumentSnapshot pathDoc : pathDocs) {
                Boolean isActive = (Boolean) pathDoc.get("isActive");

                if (Boolean.TRUE.equals(isActive)) {
                    System.out.println("Active Pathway Found! Processing...");

                    String userId = (String) pathDoc.get("userId");

                    if (userId != null) {
                        DocumentReference userDocRef = firestore.collection("Users").document(userId);
                        ApiFuture<DocumentSnapshot> userDocFuture = userDocRef.get();
                        DocumentSnapshot userDoc = userDocFuture.get();

                        if (userDoc.exists()) {
                            String userEmail = (String) userDoc.get("email");

                            if (userEmail != null) {
                                fetchPathwaysAndProcessTasks(pathDoc, userEmail);
                            } else {
                                System.out.println("Skipping pathway due to missing userEmail.");
                            }
                        } else {
                            System.out.println("User document not found for userId: " + userId);
                        }
                    } else {
                        System.out.println("Skipping pathway due to missing userId.");
                    }
                } else {
                    System.out.println("Skipping inactive pathway...");
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching pathways or processing tasks: " + e.getMessage());
            e.printStackTrace();
        }
    }


    public void fetchPathwaysAndProcessTasks(QueryDocumentSnapshot pathwayDoc, String userEmail) {
        try {
            List<Object> responsePathway = (List<Object>) pathwayDoc.get("response.pathway");

            if (responsePathway != null) {
                for (Object intervalObj : responsePathway) {
                    @SuppressWarnings("unchecked")
                    List<Object> tasks = (List<Object>) ((Map<String, Object>) intervalObj).get("tasks");

                    if (tasks != null) {
                        for (Object taskObj : tasks) {
                            @SuppressWarnings("unchecked")
                            Map<String, Object> task = (Map<String, Object>) taskObj;


                            Object scheduledDateObj = task.get("scheduledDate");
                            Date scheduledDate = Date.from(parseScheduledDate(scheduledDateObj));

                            if (scheduledDate == null || !isToday(scheduledDate)) {
                                continue;
                            }

                            Boolean taskStatus = (Boolean) task.get("isDone");

                            if (Boolean.TRUE.equals(taskStatus)) {
                                continue;
                            }

                            processTask(pathwayDoc, userEmail, task);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error processing tasks: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private boolean isToday(Date date) {
        Calendar today = Calendar.getInstance();
        Calendar taskDate = Calendar.getInstance();
        taskDate.setTime(date);

        return today.get(Calendar.YEAR) == taskDate.get(Calendar.YEAR) &&
                today.get(Calendar.DAY_OF_YEAR) == taskDate.get(Calendar.DAY_OF_YEAR);
    }

    private Instant parseScheduledDate(Object scheduledDateObj) {
        if (scheduledDateObj == null) {
            return null;
        }

        try {
            if (scheduledDateObj instanceof com.google.cloud.Timestamp) {
                return ((com.google.cloud.Timestamp) scheduledDateObj).toDate().toInstant();
            } else if (scheduledDateObj instanceof String) {
                return Instant.parse((String) scheduledDateObj);
            }
        } catch (Exception e) {
            System.err.println("Error parsing scheduledDate: " + scheduledDateObj);
            e.printStackTrace();
        }
        return null;
    }

    public void processTask(QueryDocumentSnapshot pathwayDoc, String userEmail, Map<String, Object> task) {
        try {
            System.out.println("Processing task...");

            String taskTitle = (String) task.get("taskTitle");
            System.out.println("Sending deadline alert for task: " + taskTitle);
            String userId = mailService.getUserIdFromFirebase(userEmail);

            DocumentSnapshot document = pathwayService.getUserDocumentByUserId(userId);

            if (document == null || !document.exists()) {
                logger.error("User document not found.");
                return;
            }

            Map<String, Object> preferences = (Map<String, Object>) document.get("preferences");

            Boolean emailNotif = false;

            if (preferences != null && preferences.containsKey("emailNotification")) {
                emailNotif = (Boolean) preferences.get("emailNotification");
            }            Notification notification = new Notification();

            if (Boolean.TRUE.equals(emailNotif)) {
                System.out.println("Sending email + in-app notifications...");
                notification.setNotificationType(Notification.NotificationType.BOTH);
                sendEmailAndNotificationForTaskDeadline(taskTitle, notification, userEmail, pathwayDoc);
            } else {
                System.out.println("Sending in-app notifications...");
                notification.setNotificationType(Notification.NotificationType.IN_APP);
                sendNotificationOnlyForTaskDeadline(taskTitle, notification, userEmail, pathwayDoc);
            }
        } catch (Exception e) {
            System.err.println("Error processing task: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void sendNotificationOnlyForTaskDeadline(String taskTitle, Notification notification, String userEmail, QueryDocumentSnapshot pathwayDoc) {
        notificationService.sendTaskDeadlineNotification(taskTitle, notification, userEmail, pathwayDoc);
    }

    private void sendEmailAndNotificationForTaskDeadline(String taskTitle, Notification notification, String userEmail, QueryDocumentSnapshot pathwayDoc) {
        notificationService.sendTaskDeadlineNotification(taskTitle, notification, userEmail, pathwayDoc);
        mailService.sendTaskDeadlineEmail(taskTitle, userEmail, pathwayDoc);
    }

}

