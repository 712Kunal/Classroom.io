package com.swapnil.Classroom.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.swapnil.Classroom.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class DeadlineScheduler {

    private final Firestore firestore;
    private final MailService mailService;
    private final PathwayService pathwayService;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
    private final NotificationService notificationService;



    @Scheduled(cron = "0 0 18 * * *")
    public void checkDeadlineAndSendEmail() {

        System.out.println("Scheduler started...");

        try {
            CollectionReference userCollection = firestore.collection("Users");
            ApiFuture<QuerySnapshot> userQueryFuture = userCollection.get();
            List<QueryDocumentSnapshot> userDocs = userQueryFuture.get().getDocuments();

            for (QueryDocumentSnapshot userDoc : userDocs) {
                String userId = userDoc.getId();
                String userEmail = userDoc.getString("email");

                fetchPathwaysAndProcessTasks(userId, userEmail);
            }
        } catch (Exception e) {
            System.err.println("Error fetching users or processing tasks");
            e.printStackTrace();
        }
    }

    public void fetchPathwaysAndProcessTasks(String userId, String userEmail) {
        try {
            CollectionReference pathwayCollection = firestore.collection("pathways");
            ApiFuture<QuerySnapshot> pathwayQueryFuture = pathwayCollection.whereEqualTo("userId", userId).get();
            List<QueryDocumentSnapshot> pathwayDocs = pathwayQueryFuture.get().getDocuments();

            System.out.println("Fetched pathway documents: " + pathwayDocs.size());

            for (QueryDocumentSnapshot pathwayDoc : pathwayDocs) {
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
                                Date scheduledDate = parseScheduledDate(scheduledDateObj);
                                if (scheduledDate == null) continue;

                                if (scheduledDate == null) {
                                    System.out.println("Skipping task due to missing scheduledDate: " + task.get("taskTitle"));
                                    continue;
                                }

                                if (!isToday(scheduledDate)) {
                                    System.out.println("Skipping task, not due today: " + task.get("taskTitle") + " | Scheduled Date: " + scheduledDate);
                                    continue;
                                }


//                                Boolean scheduledEmailSent = (Boolean) task.get("scheduledEmailSent");
                                Boolean taskStatus = (Boolean) task.get("isDone");

                                // Skip tasks already processed
                                if ( Boolean.TRUE.equals(taskStatus)) {
                                    continue;
                                }

                                processTask(pathwayDoc, userEmail, task);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching pathways or processing tasks: " + e.getMessage());
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



    private Date parseScheduledDate(Object scheduledDateObj) {
        try {
            if (scheduledDateObj instanceof com.google.cloud.Timestamp) {
                return ((com.google.cloud.Timestamp) scheduledDateObj).toDate();
            } else if (scheduledDateObj instanceof String) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
                return sdf.parse((String) scheduledDateObj);
            }

            else {
                System.err.println("Unsupported scheduledDate type: " + scheduledDateObj);
                return null;
            }
        } catch (Exception e) {
            System.err.println("Error parsing scheduledDate: " + e.getMessage());
            return null;
        }
    }

    public void processTask(QueryDocumentSnapshot pathwayDoc, String userEmail, Map<String, Object> task) {
        try {
            System.out.println("Processing task...");

            String taskTitle = (String) task.get("taskTitle");

            System.out.println("Sending deadline for the task: "+taskTitle);
            String userId = mailService.getUserIdFromFirebase(userEmail);

            DocumentSnapshot document = pathwayService.getUserDocumentByUserId(userId);


            if (document == null || !document.exists()) {
                logger.error("User document not found");
                return;
            }

            Boolean emailNotif = (Boolean) document.get("emailNotification");
            Notification notification = new Notification();

            if (Boolean.TRUE.equals(emailNotif)) {
                System.out.println("Sending email and in-app notifications...");
                notification.setNotificationType(Notification.NotificationType.BOTH);
                sendEmailAndNotificationForTaskDeadline(taskTitle, notification, userEmail, pathwayDoc);
                logger.info("Email and Notification sent successfully");
            } else {
                System.out.println("Sending in-app notifications...");
                notification.setNotificationType(Notification.NotificationType.IN_APP);
                sendNotificationOnlyForTaskDeadline(taskTitle, notification, userEmail, pathwayDoc);
                logger.info("Notification sent successfully");
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
            System.out.println("Updating firebase for task deadline...");
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
                            System.out.println("Attempting Firestore update...");

                            ApiFuture<WriteResult> future = documentReference.update("response.pathway", responsePathway);
                            WriteResult result = future.get();

                            System.out.println("emailSent updated for task in Firestore: " + result.getUpdateTime());
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
