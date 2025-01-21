package com.swapnil.Classroom.event;

import org.springframework.context.ApplicationEvent;

import java.time.Clock;

public class TaskCompleteEvent extends ApplicationEvent {


    private final Long userId;
    private final String taskTitle;
    private final String taskDescription;

    public TaskCompleteEvent(Object source, Long userId, String taskTitle, String taskDescription) {
        super(source);
        this.userId = userId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
    }

    // Getter methods for event data
    public Long getUserId() {
        return userId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }
}
