package com.swapnil.Classroom.service;


import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.swapnil.Classroom.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final Firestore firestore;

    public void save(Notification notification){

        try {
            firestore.collection("userNotification")
                    .document(notification.getNotificationId())
                    .set(notification)
                    .get();

            System.out.println("Notification saved successfully with ID: " + notification.getNotificationId());

        }
        catch (Exception e){
            System.err.println("Error saving notification: "+ e.getMessage());

        }



    }

    public List<Map<String, Object>> getNotificationByUserId(String userId) throws ExecutionException, InterruptedException {

            QuerySnapshot querySnapshot = firestore.collection("userNotification")
                    .whereEqualTo("userId", userId)
                    .get()
                    .get();

            if(querySnapshot.isEmpty()){
                System.out.println("No Notification found for the user: "+userId);
                return List.of();
            }

            return querySnapshot.getDocuments()
                    .stream()
                    .map(doc-> doc.getData())
                    .toList();

    }


}
