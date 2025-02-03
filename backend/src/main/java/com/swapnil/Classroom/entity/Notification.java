package com.swapnil.Classroom.entity;


import lombok.Data;

import java.util.Date;

@Data
public class Notification {

    private String notificationId;
    private String userId;
    private NotificationType notificationType=NotificationType.IN_APP;
    private NotificationReason notificationReason;
    private String relatedEntity;
    private Date notificationSendDate;
//    private Date notificationReadDate;
    private String description;


    public enum NotificationType{
        IN_APP, BOTH
    }

    public enum NotificationReason{
        PATHWAY, BADGE, POINTS, TASK
    }

}
