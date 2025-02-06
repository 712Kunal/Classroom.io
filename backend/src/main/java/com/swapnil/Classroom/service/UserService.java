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
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.security.SecureRandom;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Firestore firestore;
    private final MailService mailService;
    private final NotificationService notificationService;
    private static final String COLLECTION_NAME="UserRegistration";
    private static final Logger logger = LoggerFactory.getLogger(PathwayController.class);


//    public String registerUser(UserRegistration userRegistration) throws ExecutionException, InterruptedException {
//        DocumentReference documentReference=firestore.collection(COLLECTION_NAME).document(userRegistration.getUsername());
//        documentReference.set(userRegistration).get();
//        return "User registered successfully with username: " + userRegistration.getUsername();
//    }
//
//    // Fetch a user by their username from the 'register_user' collection
//    public UserRegistration getUserByUsername(String username) throws ExecutionException, InterruptedException {
//        DocumentReference userRef = firestore.collection("UserRegistration").document(username);
//        DocumentSnapshot documentSnapshot = userRef.get().get();
//
//        if (!documentSnapshot.exists()) {
//            // Handle document not found
//            return null;
//        }
//
//        return documentSnapshot.toObject(UserRegistration.class);
//    }
//
//
//
//    public void updateUser(UserRegistration user) throws ExecutionException, InterruptedException {
//        DocumentReference userRef = firestore.collection("register_user").document(user.getUsername());
//        userRef.set(user).get();
//    }

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

    public void sendForgotPasswordEmailAndUpdateCode(String userId, String userEmail) throws MessagingException, ExecutionException, InterruptedException {

        SecureRandom random = new SecureRandom();
        int code = 100000 + random.nextInt(900000);

        String hashedCode= BCrypt.hashpw(String.valueOf(code), BCrypt.gensalt());


        Timestamp expirationTime = Timestamp.ofTimeSecondsAndNanos((System.currentTimeMillis() + (10 * 60 * 1000)) / 1000, 0);


        DocumentReference userRef = firestore.collection("UserRegistration").document(userId);
        ApiFuture<DocumentSnapshot> future = userRef.get();
        DocumentSnapshot userDoc = future.get();

        if (!userDoc.exists()) {
            throw new IllegalStateException("User not found");
        }

        Map<String, Object> resetData = new HashMap<>();
        resetData.put("hashedCode", hashedCode);
        resetData.put("expirationTime", expirationTime);
        resetData.put("attempts", 0);

        userRef.update("resetPasswordData", resetData).get();

        String subject = "Password Reset Code";
        String body = String.format(
                "Your password reset code is: %d\n\n" +
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

    public void resetUserPassword(String userId, Long code) throws ExecutionException, InterruptedException, ParseException {
        if (userId == null || code == null) {
            throw new IllegalArgumentException("User ID and code cannot be null");
        }

        DocumentReference userRef = firestore.collection("UserRegistration").document(userId);
        ApiFuture<DocumentSnapshot> future = userRef.get();
        DocumentSnapshot userDoc = future.get();

        if (!userDoc.exists()) {
            throw new IllegalStateException("User not found");
        }

        Map<String, Object> resetData = (Map<String, Object>) userDoc.get("resetPasswordData");
        if (resetData == null) {
            System.out.println("Reset data: "+resetData);
            throw new IllegalStateException("No reset request found");
        }

        Object expirationTimeObj = resetData.get("expirationTime");
        System.out.println("Expiration time: "+expirationTimeObj);
        Date expirationTime;

        if (expirationTimeObj instanceof Timestamp) {
            expirationTime = ((Timestamp) expirationTimeObj).toDate();
        } else if (expirationTimeObj instanceof String) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            expirationTime = sdf.parse((String) expirationTimeObj);
        } else {
            throw new IllegalArgumentException("Unsupported expiration time format: " + expirationTimeObj.getClass());
        }

        Date now = new Date();
        if (now.after(expirationTime)) {
            throw new IllegalStateException("Reset code has expired");
        }

        String hashedCode = (String) resetData.get("hashedCode");
        if (!BCrypt.checkpw(String.valueOf(code), hashedCode)) {

            Integer attempts = (Integer) resetData.getOrDefault("attempts", 0);
            attempts++;

            if (attempts >= 3) {
                userRef.update("resetPasswordData", null).get();
                throw new IllegalStateException("Too many incorrect attempts. Please request a new reset code.");
            }

            userRef.update("resetPasswordData.attempts", attempts).get();
            throw new IllegalStateException("Invalid reset code");
        }

        userRef.update("resetPasswordData", null).get();

    }
}
