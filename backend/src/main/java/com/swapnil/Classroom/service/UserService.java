package com.swapnil.Classroom.service;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.swapnil.Classroom.entity.UserRegistration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final Firestore firestore;
    private static final String COLLECTION_NAME="UserRegistration";

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
}
