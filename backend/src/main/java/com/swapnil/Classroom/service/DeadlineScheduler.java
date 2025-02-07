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

    @Scheduled(cron = "0 3 14 * * *")
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

                            System.out.println("Task from Firebase: " + task);

                            Object scheduledDateObj = task.get("scheduledDate");
                            System.out.println("Scheduled Obj: " + scheduledDateObj);
                            Date scheduledDate = Date.from(parseScheduledDate(scheduledDateObj));
                            System.out.println("Scheduled date: " + scheduledDate);

                            if (scheduledDate == null || !isToday(scheduledDate)) {
                                continue;
                            }

                            Boolean taskStatus = (Boolean) task.get("isDone");

                            // Skip already completed tasks
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

            Boolean emailNotif = (Boolean) document.get("emailNotification");
            Notification notification = new Notification();

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

    public void updateEmailSentInFirestore(QueryDocumentSnapshot pathwayDoc, Map<String, Object> task) {
        try {
            System.out.println("Updating Firebase for task deadline...");
            List<Object> responsePathway = (List<Object>) pathwayDoc.get("response.pathway");

            for (Object intervalObj : responsePathway) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> tasks = (List<Map<String, Object>>) ((Map<String, Object>) intervalObj).get("tasks");

                if (tasks != null) {
                    for (Map<String, Object> taskObj : tasks) {
                        Long taskId = (Long) taskObj.get("taskNumber");
                        Long incomingTaskId = (Long) task.get("taskNumber");

                        if (taskId != null && taskId.equals(incomingTaskId)) {
                            taskObj.put("deadlineEmailSent", true);

                            DocumentReference documentReference = pathwayDoc.getReference();
                            ApiFuture<WriteResult> future = documentReference.update("response.pathway", responsePathway);
                            WriteResult result = future.get();

                            System.out.println("emailSent updated in Firestore: " + result.getUpdateTime());
                            return;
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error updating emailSent in Firestore: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

