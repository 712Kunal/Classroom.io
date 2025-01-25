//package com.swapnil.Classroom.service;
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.*;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import java.util.*;
//
//@Service
//@RequiredArgsConstructor
//public class FirebaseChangeListenerService {
//
//    private final Firestore firestore;
//    private final MailService mailService;
//
//
//    @PostConstruct
//    public void startListening() {
//        System.out.println("Starting Firestore listener...");
//
//        CollectionReference pathwaysRef = firestore.collection("Pathway");
//
//        pathwaysRef.addSnapshotListener((snapshots, error) -> {
//            if (error != null) {
//                System.err.println("Firestore listening failed: " + error.getMessage());
//                return;
//            }
//
//            if (snapshots != null) {
//                snapshots.getDocumentChanges().stream()
//                        .filter(docChange -> docChange.getType() == DocumentChange.Type.MODIFIED)
//                        .forEach(docChange -> processPathwayChanges(docChange.getDocument()));
//            }
//        });
//    }
//
//    private void processPathwayChanges(DocumentSnapshot document) {
//        String userId = document.getString("userId");
//
//        List<Map<String, Object>> pathways = (List<Map<String, Object>>) document.get("response.pathway");
//        if (pathways == null) {
//            System.err.println("No pathways found for user: " + userId);
//            return;
//        }
//
//        for (Map<String, Object> interval : pathways) {
//            List<Map<String, Object>> tasks = (List<Map<String, Object>>) interval.get("tasks");
//            if (tasks == null) continue;
//
//            tasks.forEach(task -> processTask(document, task, userId));
//        }
//    }
//
//    private void processTask(DocumentSnapshot document, Map<String, Object> task, String userId) {
//        Boolean isDone = (Boolean) task.get("done");
//        Boolean previousIsDone = (Boolean) task.get("previousIsDone");
//        Boolean isEmailSent = (Boolean) task.get("emailSent");
//
//        if (Boolean.TRUE.equals(isDone) && (previousIsDone == null || !previousIsDone.equals(isDone)) && !Boolean.TRUE.equals(isEmailSent)) {
//            mailService.sendTaskCompletionEmail(task, userId);
//            task.put("emailSent", true);
//        }
//
//        if (!Boolean.TRUE.equals(isDone) && !Boolean.TRUE.equals(previousIsDone)) {
//            task.put("previousIsDone", isDone);
//            System.out.println("Task to be updated: "+task.get("taskNumber"));
//            updateTaskInFirestore(document, task);
//        }
//    }
//
//
//
//    private void updateTaskInFirestore(DocumentSnapshot document, Map<String, Object> updatedTask) {
//        try {
//            List<Map<String, Object>> responsePathway = (List<Map<String, Object>>) document.get("response.pathway");
//
//            String updatedTaskTitle = "";
//            boolean updated = false;
//
//            for (Map<String, Object> interval : responsePathway) {
//                List<Map<String, Object>> tasks = (List<Map<String, Object>>) interval.get("tasks");
//                if (tasks == null) continue;
//
//                for (Map<String, Object> task : tasks) {
//                    if (task.get("taskNumber").equals(updatedTask.get("taskNumber"))) {
//                        task.put("emailSent", updatedTask.get("emailSent"));
//                        task.put("previousIsDone", updatedTask.get("done"));
//                        updated = true;
//
//                        updatedTaskTitle = (String) task.get("taskTitle");
//                    }
//                }
//
//                if (updated) break;
//            }
//
//            if (updated) {
//                ApiFuture<WriteResult> future = document.getReference().update("response.pathway", responsePathway);
//                WriteResult result = future.get();
//                System.out.println("Task updated successfully in Firestore: " + updatedTaskTitle);
//            } else {
//                System.err.println("Task not found for updating in Firestore.");
//            }
//        } catch (Exception e) {
//            System.err.println("Error updating task in Firestore: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//
//
//
//
//
//
//
//}
