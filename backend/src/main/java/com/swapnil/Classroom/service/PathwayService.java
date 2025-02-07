package com.swapnil.Classroom.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.swapnil.Classroom.exception.PathwayNotFoundException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class PathwayService {

    private final Firestore firestore;
    private final MailService mailService;

    public PathwayService(Firestore firestore, MailService mailService) {
        this.firestore = firestore;
        this.mailService = mailService;
    }



    private Map<String , Object> getTaskFromPathway(String pathwayId, Long taskId) throws Exception {

        DocumentReference documentReference = firestore.collection("Pathway").document(pathwayId);

        DocumentSnapshot pathwayDoc = documentReference.get().get();

        if (!pathwayDoc.exists()) {
            throw new PathwayNotFoundException("Pathway not found");
        }

        List<Map<String, Object>> pathways = (List<Map<String, Object>>) pathwayDoc.get("response.pathway");

        for (Map<String, Object> intervals : pathways){
            List<Map<String , Object>> tasks= (List<Map<String, Object>>) intervals.get("tasks");

            if(tasks!=null){

                for(Map<String , Object> task:tasks){

                    if(task.get("taskNumber").equals(taskId)){
                        return task;
                    }
                }
            }

        }
        throw new Exception("Task not found for taskId: " + taskId);


    }

    private String getUserEmailByUserId(String userId) throws Exception {


        DocumentReference userRef = firestore.collection("Users").document(userId);

        DocumentSnapshot userDoc = userRef.get().get();
        if (!userDoc.exists()) {
            throw new Exception("User not found for userId: " + userId);
        }
        return userDoc.getString("email");
    }


    public String getUserIdFromPathwayId(String pathwayId) throws Exception {

        DocumentReference documentReference= firestore.collection("pathways").document(pathwayId);

        DocumentSnapshot document=documentReference.get().get();

        if(!document.exists()){
            throw new PathwayNotFoundException("Pathway not found");

        }

        String userId=document.getString("userId");
        if(userId==null){
            throw new Exception("UserId is missing in pathway");
        }

        return userId;
    }

    private void updateTaskEmailSent(String pathwayId, Long taskId, boolean emailSent) throws Exception {

        System.out.println("Updating the firebase...");
        DocumentReference pathwayRef = firestore.collection("Pathway").document(pathwayId);

        DocumentSnapshot document = pathwayRef.get().get();
        if (!document.exists()) {
            throw new Exception("Pathway not found for pathwayId: " + pathwayId);
        }

        List<Map<String, Object>> pathways = (List<Map<String, Object>>) document.get("response.pathway");
        boolean taskUpdated = false;

        for (Map<String, Object> interval : pathways) {
            List<Map<String, Object>> tasks = (List<Map<String, Object>>) interval.get("tasks");
            if (tasks != null) {
                for (Map<String, Object> task : tasks) {
                    if (task.get("taskNumber").equals(taskId)) {
                        task.put("completionEmailSent", emailSent);
                        taskUpdated = true;
                        break;
                    }
                }
            }
            if (taskUpdated) break;
        }

        if (!taskUpdated) {
            throw new Exception("Task not found to update emailSent field.");
        }

        ApiFuture<WriteResult> updateFuture = pathwayRef.update("response.pathway", pathways);
        updateFuture.get();  // Wait for the update to complete

    }



    public Map<String, Object> getPathwayById(String pathwayId) {
        System.out.println("Finding pathway by Id..."+pathwayId);


        System.out.println("Finding pathway by Id..."+pathwayId);

        try {
            ApiFuture<DocumentSnapshot> future = firestore.collection("pathways").document(pathwayId).get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                System.out.println("Document data: "+document.getData());
                // Return the document as a Map instead of a custom Pathway class
                return document.getData(); // Get all fields in the document as a Map
            } else {
                System.out.println("No document found with pathwayId: " + pathwayId);
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public void sendPathwayActivationEmail(String userId, String pathwayId) throws ExecutionException, InterruptedException {

        System.out.println("userId: "+userId);

        DocumentReference documentReference=firestore.collection("Users").document(userId);
        DocumentSnapshot userDoc= documentReference.get().get();

        String userEmail= (String) userDoc.get("email");
        String userName=(String) userDoc.get("username");
        System.out.println("userEmail: "+userEmail);
        System.out.println("username: "+userName);


        String pathwayDescription="";
        Map<String, Object> pathwayData = getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }
        try {

            if (userEmail == null) {
                System.out.println("Email not found with userEmail: " + userEmail);
                return;
            }


            String subject = "🎉 Welcome to Your New Pathway! 🚀";
            String body = String.format(
                    "Hello %s,\n\n" +
                            "🎊 Congratulations on activating the '%s' pathway! 🎊\n\n" +
                            "✨ Best regards, ✨\n" +
                            "Team Pathify",
                    userName, pathwayDescription
            );


            System.out.println("Email is sent to: "+userEmail);
            mailService.sendEmail(userEmail, subject, body);


        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendPathwayCompletionEmail(String userId, String pathwayId) throws ExecutionException, InterruptedException {

        System.out.println("userId: "+userId);

        DocumentReference documentReference=firestore.collection("Users").document(userId);
        DocumentSnapshot userDoc= documentReference.get().get();



        String userEmail= (String) userDoc.get("email");
        String userName=(String) userDoc.get("username");
        System.out.println("userEmail: "+userEmail);
        System.out.println("username: "+userName);


        String pathwayDescription="";
        Map<String, Object> pathwayData = getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }
        try {

            if (userEmail == null) {
                System.out.println("Email not found with userEmail: " + userEmail);
                return;
            }


            String subject = "🎉 Pathway Completion! 🏆";
            String body = String.format(
                    "Hello %s,\n\n" +
                            "🎊 Congratulations on successfully completing the '%s' pathway! 🎊\n\n" +
                            "📚 We hope you enjoyed the journey and learned a lot. 🚀✨\n\n" +
                            "Best regards,\n" +
                            "Team Pathify",
                    userName, pathwayDescription
            );



            System.out.println("Email is sent to: "+userEmail);
            mailService.sendEmail(userEmail, subject, body);


        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendPathwayGenerationEmail(String userId, String pathwayId, DocumentSnapshot document) throws ExecutionException, InterruptedException {

        System.out.println("userId: "+userId);

        DocumentReference documentReference=firestore.collection("Users").document(userId);
        DocumentSnapshot userDoc= documentReference.get().get();

        Long generatedPathwayCount= (Long) document.get("generatedPathwayCount");

        String userEmail= (String) userDoc.get("email");
        String userName=(String) userDoc.get("username");
        System.out.println("userEmail: "+userEmail);
        System.out.println("username: "+userName);


        String pathwayDescription="";
        String subject="";
        String body="";

        Map<String, Object> pathwayData = getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }
        try {

            if (userEmail == null) {
                System.out.println("Email not found with userEmail: " + userEmail);
                return;
            }

            if(generatedPathwayCount==0){

                subject = "🎉 Welcome to Your First Pathway! 🚀";
                body = String.format(
                        "Hello %s,\n\n" +
                                "🎊 Congrats creating your first pathway: '%s'! 🎊\n\n" +
                                "🚀 Dive in, explore, and take it step by step. Every effort brings you closer to success! 💡\n\n" +
                                "🌟 Best of luck! 🌟\n\n" +
                                "Warm regards,\n" +
                                "Team Pathify",
                        userName, pathwayDescription
                );

            }
            else{

            subject = "🎉 Welcome to Your New Pathway! 🚀";
            body = String.format(
                    "Hello %s,\n\n" +
                            "🎊 Congrats creating your new pathway: '%s'! 🎊\n\n" +
                            "🚀 Dive in, explore, and take it step by step. Every effort brings you closer to success! 💡\n\n" +
                            "🌟 Best of luck! 🌟\n\n" +
                            "Warm regards,\n" +
                            "Team Pathify",
                    userName, pathwayDescription
            );
            }



            System.out.println("Email is sent to: "+userEmail);
            mailService.sendEmail(userEmail, subject, body);


        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendPathwayProgressEmail(String userId, String pathwayId, int progressPercentage) throws ExecutionException, InterruptedException {


        System.out.println("userId: "+userId);

        DocumentReference documentReference=firestore.collection("Users").document(userId);
        DocumentSnapshot userDoc= documentReference.get().get();

        String userEmail= (String) userDoc.get("email");
        String userName=(String) userDoc.get("username");
        System.out.println("userEmail: "+userEmail);
        System.out.println("username: "+userName);


        String pathwayDescription="";
        Map<String, Object> pathwayData = getPathwayById(pathwayId);
        if(pathwayData!=null){
            pathwayDescription = (String) pathwayData.get("topic");

        }
        try {

            if (userEmail == null) {
                System.out.println("Email not found with userEmail: " + userEmail);
                return;
            }


            String subject = "🚀 Your Pathway Progress Update! 📈";
            String body = String.format(
                    "Hello %s,\n\n" +
                            "🎉 You’re making great progress on your pathway: '%s'! 🎊\n\n" +
                            "📊 Current progress: %d%%. Keep it up—you're closer to your goal! 🎯\n\n" +
                            "Cheers,\n" +
                            "Team Pathify",
                    userName, pathwayDescription, progressPercentage
            );




            System.out.println("Email is sent to: "+userEmail);
            mailService.sendEmail(userEmail, subject, body);


        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


    public DocumentSnapshot getUserDocumentByUserId(String userId) {
        CollectionReference userProfiles = firestore.collection("UserProfiles");

        Query query = userProfiles.whereEqualTo("userId", userId);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        try {
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
            if (!documents.isEmpty()) {
                return documents.get(0);
            } else {
                System.out.println("No matching document found!");
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return null;
        }
    }
}
