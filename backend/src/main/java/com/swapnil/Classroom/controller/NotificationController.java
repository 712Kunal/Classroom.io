package com.swapnil.Classroom.controller;


import com.swapnil.Classroom.entity.Notification;
import com.swapnil.Classroom.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/notification/save")
    public ResponseEntity<String> saveNotification(
            @RequestBody Notification  notification
            )
    {
        try {
            notificationService.save(notification);
            return ResponseEntity.ok("Notification saved successfully");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in saving notification");
        }
    }
}
