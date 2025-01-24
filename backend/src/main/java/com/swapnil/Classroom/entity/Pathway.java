package com.swapnil.Classroom.entity;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class Pathway {

    private String pathwayId; // Unique ID for the pathway
    private String userId; // Reference to Firebase Auth User

    private String topic; // Topic of the pathway
    private String description; // Description of the pathway
    private int duration; // Duration in number of intervals

    private Date startDate; // Start date of the pathway
    private Date endDate; // End date of the pathway

    private String responseRaw; // Raw JSON string of the pathway response
    private Response response; // Parsed pathway response

    @Data
    public static class Response {
        private String topic; // The topic entered by the user
        private int intervals; // Number of intervals (e.g., Week, Day, Month)
        private String intervalType; // Enum("Week", "Day", "Month")
        private List<Interval> pathway; // List of intervals

        @Data
        public static class Interval {
            private int intervalNumber; // Number of the interval
            private String summary; // Brief summary of the interval's focus
            private Date pathwayStartDate; // Start date of the interval
            private Date pathwayEndDate; // End date of the interval
            private List<Task> tasks; // List of tasks within the interval

            @Data
            public static class Task {
                private int taskNumber; // Number of the task
                private String taskTitle; // Title of the task
                private String description; // Description of the task

                private Boolean completionEmailSent=false;
                private Boolean deadlineEmailSent=false;

                private Date scheduledDate; // Date the task is scheduled
                private Date completedDate; // Date the task was completed
                private boolean isDone; // Whether the task is completed
                private boolean lateMark; // Whether the task was late

                private List<Resource> resources; // List of resources
                private String expectedOutcome; // Expected outcome of the task

                @Data
                public static class Resource {
                    private String title; // Title of the resource
                    private String type; // Type of resource (e.g., Video, Article)
                    private String link; // URL to the resource
                }
            }
        }
    }
}
