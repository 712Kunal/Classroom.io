package com.swapnil.Classroom.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
@RequiredArgsConstructor
public class FirebaseConfig {

    @Value("${firebase.privateKeyPath}")
    private String privateKeyPath;

    @Bean
    public FirebaseApp initializeFirebaseApp() throws IOException {
//        System.out.println("Firebase: " + privateKeyPath);

        // Load the service account key from the classpath
        try (InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream(privateKeyPath)) {
            if (serviceAccount == null) {
//                System.out.println("Service account: " + serviceAccount);


                throw new IOException("Service account key not found in classpath");
            }

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            return FirebaseApp.initializeApp(options);
        }
    }

    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        // Return Firestore instance using the initialized FirebaseApp
        return FirestoreClient.getFirestore();
    }
}
