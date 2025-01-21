package com.swapnil.FirebaseDemo1.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Paths;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp initializeFirebaseApp() throws IOException, URISyntaxException {
        // Load the service account key from the classpath
        var resource = getClass().getClassLoader().getResource("serviceAccountKey.json");
        if (resource == null) {
            throw new IOException("Service account key not found in classpath");
        }

        // Load the service account key file
        var file = Paths.get(resource.toURI()).toFile();
        try (FileInputStream serviceAccount = new FileInputStream(file)) {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://FirebaseDemo1.firebaseio.com")
                    .build();

            // Initialize FirebaseApp
            FirebaseApp firebaseApp = FirebaseApp.initializeApp(options);
            return firebaseApp;
        }
    }

    @Bean
    public FirebaseDatabase firebaseDatabase(FirebaseApp firebaseApp) {
        // Get FirebaseDatabase instance using the initialized FirebaseApp
        return FirebaseDatabase.getInstance(firebaseApp);
    }
}
