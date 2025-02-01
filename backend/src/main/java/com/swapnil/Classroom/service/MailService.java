package com.swapnil.Classroom.service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.swapnil.Classroom.entity.Notification;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final Firestore firestore;

    public void sendEmail(String to, String title, String body) throws MessagingException {

        MimeMessage message=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(title);
        helper.setText(body);

        javaMailSender.send(message);
    }

    public void sendTaskCompletionEmail(Map<String, Object> task, String userEmail, String userId)  {

        try{

            if(userEmail==null){
                System.out.println("Email not found with userId: "+userEmail);
                return;
            }

            String username=userId;

            System.out.println("Sending task completion email...");
            String taskTitle= (String) task.get("taskTitle");
            String taskDesc=(String) task.get("description");

            String subject = "Task Completed: " + taskTitle;
            String body = "Dear "+username+"\n\nYour task " + taskTitle + "' has been marked as completed.\n\nDescription: " + taskDesc;

            System.out.println("Email is sent to: "+userEmail);
            sendEmail(userEmail, subject, body);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


    }




//    private String getUserEmailFromFirebase(String userId) {
//        try {
//            // Query the UserRegistration collection by userId
//            ApiFuture<DocumentSnapshot> future = firestore.collection("UserRegistration").document(userId).get();
//            DocumentSnapshot document = future.get();
//
//            // Check if the document exists
//            if (document.exists()) {
//                // Return the email field from the document
//                return document.getString("email");
//            } else {
//                System.err.println("User not found in UserRegistration collection for userId: " + userId);
//                return null;
//            }
//        } catch (Exception e) {
//            System.err.println("Error fetching user email from Firestore: " + e.getMessage());
//            e.printStackTrace();
//            return null;
//        }
//    }


        public String getUserIdFromFirebase(String userEmail) {
            try {
                ApiFuture<QuerySnapshot> query = firestore.collection("UserRegistration")
                        .whereEqualTo("email", userEmail)
                        .get();

                QuerySnapshot querySnapshot = query.get();

                if (!querySnapshot.isEmpty()) {
                    QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
                    String documentId = document.getId();
                    System.out.println("Found document ID: " + documentId);
                    return documentId;
                } else {
                    System.out.println("No document found for email: " + userEmail);
                    return null;
                }
            } catch (Exception e) {
                System.err.println("Error finding document by email: " + e.getMessage());
                e.printStackTrace();
                return null;
            }
    }



    public void sendTaskDeadlineEmail(String taskTitle, String userEmail, QueryDocumentSnapshot pathwayDoc) {
        try {

            if (userEmail == null) {
                System.out.println("Email not found with userEmail: " + userEmail);
                return;
            }

            String subject = "⏳ Task Reminder ⏳";

            String pathwayTopic = (String) pathwayDoc.get("topic");
            System.out.println("Pathway Document Data: " + pathwayDoc.getData());

            String body = String.format(
                    "Your task **'%s'** is due today as part of your pathway: **'%s'**.\n\n" +
                            "❗ If not completed by the deadline, it will be marked as **Late** in your tracker.\n\n" +
                            "Stay on track and keep up the great work!\n\n" +
                            "Best regards,\n" +
                            "Team Pathify",
                    taskTitle, pathwayTopic
            );

            System.out.println("Email is sent to: " + userEmail);
            sendEmail(userEmail, subject, body);

        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email", e);
        }
    }



}
