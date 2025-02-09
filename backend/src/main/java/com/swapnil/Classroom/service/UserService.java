package com.swapnil.Classroom.service;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.swapnil.Classroom.controller.PathwayController;
import com.swapnil.Classroom.entity.Notification;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Firestore firestore;
    private final MailService mailService;
    private final NotificationService notificationService;
    private static final String COLLECTION_NAME="UserRegistration";
    private static final Logger logger = LoggerFactory.getLogger(PathwayController.class);


    public void sendUserSignupNotification(String userId) {

        Notification notification=new Notification();
        try{

            String notificationId="notif"+System.currentTimeMillis();

            Date notificationSendDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

            notification.setNotificationId(notificationId);
            notification.setUserId(userId);
            notification.setNotificationReason(null);
            notification.setNotificationSendDate(notificationSendDate);
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

        DocumentReference documentReference=firestore.collection("Users").document(userId);
        DocumentSnapshot userDoc= documentReference.get().get();

        String userName=(String) userDoc.get("username");

        String subject = "🎉 Welcome to Pathify! 🚀";
        String body = String.format(
                "Hello %s,\n\n" +
                        "🎊 Welcome to Pathify! Your account is ready. Start exploring your personalized pathways! 💡\n\n" +
                        "Need help? Contact support. 🤝\n\n" +
                        "Happy learning! \n\n" +
                        "Best,\n" +
                        "Team Pathify",
                userName
        );


        mailService.sendEmail(userEmail, subject, body);


    }


    public void sendCodeForVerification(String userId, String userEmail) throws MessagingException, ExecutionException, InterruptedException {
        SecureRandom random = new SecureRandom();
        int code = 1000 + random.nextInt(9000);  // 4-digit OTP

        System.out.println("Generated Code: " + code);

//        String hashedCode = BCrypt.hashpw(String.valueOf(code), BCrypt.gensalt());
        Timestamp expirationTime = Timestamp.ofTimeSecondsAndNanos((System.currentTimeMillis() + (10 * 60 * 1000)) / 1000, 0);

        // 🔹 Create verificationData map
        Map<String, Object> verificationData = new HashMap<>();
        verificationData.put("verificationCode", code);
        verificationData.put("expirationTime", expirationTime);

        DocumentReference userRef = firestore.collection("UserProfiles").document(userId);

        // 🔹 Create a map for the update
        Map<String, Object> updates = new HashMap<>();
        updates.put("verificationData", verificationData);

        // 🔹 Use set() with merge to ensure it updates or creates
        userRef.set(updates, SetOptions.merge()).get();

        String subject = "Email verification code";
        String body = String.format(
                "Your Email verification code is: %d\n\n" +
                        "This code will expire in 10 minutes.\n" +
                        "If you did not request this reset, please ignore this email and secure your account.",
                code
        );

        try {
            mailService.sendEmail(userEmail, subject, body);
        } catch (MessagingException e) {
            throw e;
        }
    }




}
