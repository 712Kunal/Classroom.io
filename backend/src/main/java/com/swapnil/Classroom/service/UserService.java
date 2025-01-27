package com.swapnil.Classroom.service;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.swapnil.Classroom.controller.PathwayController;
import com.swapnil.Classroom.entity.Notification;
import com.swapnil.Classroom.entity.UserRegistration;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Firestore firestore;
    private final MailService mailService;
    private final NotificationService notificationService;
    private static final String COLLECTION_NAME="UserRegistration";
    private static final Logger logger = LoggerFactory.getLogger(PathwayController.class);


    public String registerUser(UserRegistration userRegistration) throws ExecutionException, InterruptedException {
        DocumentReference documentReference=firestore.collection(COLLECTION_NAME).document(userRegistration.getUsername());
        documentReference.set(userRegistration).get();
        return "User registered successfully with username: " + userRegistration.getUsername();
    }

    // Fetch a user by their username from the 'register_user' collection
    public UserRegistration getUserByUsername(String username) throws ExecutionException, InterruptedException {
        DocumentReference userRef = firestore.collection("UserRegistration").document(username);
        DocumentSnapshot documentSnapshot = userRef.get().get();

        if (!documentSnapshot.exists()) {
            // Handle document not found
            return null;
        }

        return documentSnapshot.toObject(UserRegistration.class);
    }



    // Update an existing user's details in the 'register_user' collection
    public void updateUser(UserRegistration user) throws ExecutionException, InterruptedException {
        DocumentReference userRef = firestore.collection("register_user").document(user.getUsername());
        userRef.set(user).get();
    }

    public void sendUserSignupNotification(String userId) {

        Notification notification=new Notification();
        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(null);
            notification.setNotificationSendDate(notificationSendDate);
            notification.setNotificationReadDate(null);
            notification.setRelatedEntity(null);
            notification.setDescription("Welcome to the Personalized Learning Pathway Generator! Your account has been successfully created. Start exploring personalized learning pathways to achieve your goals.");

            notificationService.save(notification);

            logger.info("Notification send for userId: "+userId);
        }
        catch (Exception e) {
            logger.error("Error sending notification", e);
        }

    }

    public void sendUserSignupEmail(String userId, String userEmail) throws ExecutionException, InterruptedException, MessagingException {

        DocumentReference documentReference=firestore.collection("UserRegistration").document(userId);
        DocumentSnapshot userDoc= documentReference.get().get();

        String userName=(String) userDoc.get("username");

        String subject = "Welcome to Pathify!";
        String body = String.format(
                "Hello %s,\n\n" +
                        "Welcome to Pathify, your personalized learning companion!\n\n" +
                        "Your account has been successfully created, and we're excited to have you on board. Start exploring tailored learning pathways designed just for you and achieve your goals with ease.\n\n" +
                        "If you have any questions or need assistance, feel free to reach out to our support team.\n\n" +
                        "Happy learning!\n\n" +
                        "Best regards,\n" +
                        "Team Pathify",
                userName
        );

        mailService.sendEmail(userEmail, subject, body);


    }
}
