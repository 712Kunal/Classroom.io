package com.swapnil.Classroom.service;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
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


    public void sendCodeForVerification(String userId, String userEmail)
            throws MessagingException, ExecutionException, InterruptedException {

        SecureRandom random = new SecureRandom();
        int code = 1000 + random.nextInt(9000);

        System.out.println("Code: " + code);

        String hashedCode = BCrypt.hashpw(String.valueOf(code), BCrypt.gensalt());

        long expirationInSeconds = (System.currentTimeMillis() / 1000) + (10 * 60);
        Timestamp expirationTime = Timestamp.ofTimeSecondsAndNanos(expirationInSeconds, 0);

        Map<String, Object> data = new HashMap<>();
        data.put("userId", userId);
        data.put("verificationCode", hashedCode);
        data.put("expirationTime", expirationTime);
        data.put("attempts", 0);

        DocumentReference userRef = firestore.collection("userEmailVerification").add(data).get();

        String subject = "Email Verification Code";
        String body = String.format(
                "Your email verification code is: %d\n\n" +
                        "This code will expire in 10 minutes.\n" +
                        "If you did not request this verification, please ignore this email.",
                code
        );

        try {
            mailService.sendEmail(userEmail, subject, body);
        } catch (MessagingException e) {
            throw e;
        }
    }

}
