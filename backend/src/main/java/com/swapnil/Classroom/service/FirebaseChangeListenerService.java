package com.swapnil.Classroom.service;


import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentChange;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.database.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FirebaseChangeListenerService {

    private final Firestore firestore;
    private final MailService mailService;


    @PostConstruct
    public void startListening(){

        System.out.println("Starting Firestore listener...");

        CollectionReference pathwaysRef = firestore.collection("Pathway");

        pathwaysRef.addSnapshotListener((snapshots, error) -> {
            if (error != null) {
                System.err.println("Firestore listening failed: " + error.getMessage());
                return;
            }

            if (snapshots != null) {
                for (DocumentChange documentChange : snapshots.getDocumentChanges()) {
                    if (documentChange.getType() == DocumentChange.Type.MODIFIED) {
                        processPathwayChanges(documentChange.getDocument(), documentChange.getOldIndex());
                    }
                }
            }
        });
    }




    private void processPathwayChanges(DocumentSnapshot document, int oldIndex){

        System.out.println("Changes in pathway...");
        String userId = document.getString("userId");

        List<Map<String, Object>> pathways=(List<Map<String, Object>>)document.get("response.pathway");

        if(pathways!= null){
            for(Map<String , Object> interval:pathways){

                List<Map<String, Object>> tasks=(List<Map<String, Object>>)interval.get("tasks");

                if(tasks!=null){

                    for(Map<String, Object> task:tasks){

                        Boolean isDone= (Boolean) task.get("done");


                        if(Boolean.TRUE.equals(isDone)){


                            System.out.println("Sending the email of completion...");
                                // Send completion email
                                mailService.sendCompletionEmail(task, userId);

                        }
                    }
                }
            }
        }

    }

}
