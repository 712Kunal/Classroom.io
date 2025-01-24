package com.swapnil.Classroom.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class DeadlineScheduler {

    private final Firestore firestore;
    private final MailService mailService;

    @Scheduled(cron = "0 * * * * *")
    public void checkDeadlineAndSendEmail() {

        System.out.println("Scheduler started...");

        try {
            CollectionReference userCollection = firestore.collection("UserRegistration");
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
            CollectionReference pathwayCollection = firestore.collection("Pathway");
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

                                Boolean deadlineEmailSent = (Boolean) task.get("deadlineEmailSent");
                                Boolean taskStatus = (Boolean) task.get("done");

                                if (Boolean.TRUE.equals(deadlineEmailSent) || Boolean.TRUE.equals(taskStatus)) {
                                    continue; // Skip already processed tasks
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

    public void processTask(QueryDocumentSnapshot pathwayDoc, String userEmail, Map<String, Object> task) {
        try {
            System.out.println("Checking deadlines...");

            Object scheduledDateObj = task.get("scheduledDate");
            Date scheduledDate;

            if (scheduledDateObj instanceof com.google.cloud.Timestamp) {
                scheduledDate = ((com.google.cloud.Timestamp) scheduledDateObj).toDate();
            } else if (scheduledDateObj instanceof String) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                scheduledDate = sdf.parse((String) scheduledDateObj);
            } else {
                throw new IllegalArgumentException("Unsupported scheduledDate type: " + scheduledDateObj);
            }

            System.out.println("Checking date difference...");
            Date now = new Date();
            long oneDayInMillis = TimeUnit.DAYS.toMillis(1);
            long timeDifference = scheduledDate.getTime() - now.getTime();

            if (timeDifference <= oneDayInMillis && timeDifference > 0) {
                mailService.sendTaskDeadlineEmail(userEmail, task); // Send email
                System.out.println("Deadline email sent to: "+userEmail);

                task.put("deadlineEmailSent", true);
                updateEmailSentInFirestore(pathwayDoc, task);
            }

        } catch (Exception e) {
            System.err.println("Error in processing task: " + e.getMessage());
            e.printStackTrace();
        }
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
