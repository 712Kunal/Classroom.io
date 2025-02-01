package com.swapnil.Classroom.entity;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class Pathway {

    private String pathwayId;
    private String userId;

    private String topic;
    private String description;
    private int duration;

    private Date startDate;
    private Date endDate;

    private String responseRaw;
    private Response response;

    @Data
    public static class Response {
        private String topic;
        private int intervals;
        private String intervalType;
        private List<Interval> pathway;

        @Data
        public static class Interval {
            private int intervalNumber;
            private String summary;
            private Date pathwayStartDate;
            private Date pathwayEndDate;
            private List<Task> tasks;

            @Data
            public static class Task {
                private int taskNumber;
                private String taskTitle;
                private String description;

                private Boolean scheduledNotificationSent=false;

                private Date scheduledDate;
                private Date completedDate;
                private boolean isDone;
                private boolean lateMark;

                private List<Resource> resources;
                private String expectedOutcome;

                @Data
                public static class Resource {
                    private String title;
                    private String type;
                    private String link;
                }
            }
        }
    }
}
