package com.swapnil.Classroom.service;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.swapnil.Classroom.entity.Pathway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service

public class PathwayService {

    private final Firestore firestore;

    public PathwayService(Firestore firestore) {
        this.firestore = firestore;
    }

    public void createPathway(Pathway pathway) throws ExecutionException, InterruptedException {

        System.out.println("Pathway Id: " + pathway.getPathwayId());


        if (pathway.getPathwayId() == null) {
            firestore.collection("Pathway").add(pathway).get();
        } else {
            firestore.collection("Pathway").document(pathway.getPathwayId()).set(pathway).get();
        }
    }

    public List<Pathway> getPathwaysByUser(String userId) throws ExecutionException, InterruptedException {
        CollectionReference collectionReference = firestore.collection("Pathway");
        QuerySnapshot querySnapshot = collectionReference.whereEqualTo("userId", userId).get().get();

        List<Pathway> pathways = new ArrayList<>();
        querySnapshot.forEach(document -> {
            Pathway pathway = document.toObject(Pathway.class);
            pathways.add(pathway);
        });

        return pathways;
    }
}
