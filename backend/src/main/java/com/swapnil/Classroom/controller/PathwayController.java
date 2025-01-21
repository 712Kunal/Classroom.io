package com.swapnil.Classroom.controller;

import com.swapnil.Classroom.entity.Pathway;
import com.swapnil.Classroom.service.PathwayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/pathway")
@RequiredArgsConstructor
public class PathwayController {

    private final PathwayService pathwayService;

    @PostMapping("/create")
    public ResponseEntity<String> createPathway(@RequestBody Pathway pathway){

        try{
            pathwayService.createPathway(pathway);
            return ResponseEntity.ok("Pathway created successfully");
        }
        catch (Exception e){
            return ResponseEntity.status(500).body("Error creating pathway: "+e.getMessage());
        }

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPathwaysByUser(@PathVariable String userId) {
        try {
            List<Pathway> pathways = pathwayService.getPathwaysByUser(userId);
            if (pathways.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No pathways found for user: " + userId);
            }
            return ResponseEntity.ok(pathways);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving pathways: " + e.getMessage());
        }
    }
}
