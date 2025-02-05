import { z } from 'zod';

// Zod Schemas
const ResourceSchema = z.object({
  title: z.string(),
  type: z.enum(['Documentation', 'Video', 'Interactive Exercise', 'Video Tutorial']),
  link: z.string().url()
});

const TaskSchema = z.object({
  taskNumber: z.number(),
  taskTitle: z.string(),
  description: z.string(),
  scheduledDate: z.coerce.date().optional(),
  completedDate: z.coerce.date().optional(),
  isDone: z.boolean().default(false),
  lateMark: z.boolean().default(false),
  resources: z.array(ResourceSchema),
  expectedOutcome: z.string(),
  completionEmailSent: z.boolean().optional().default(false),
  deadlineEmailSent: z.boolean().optional().default(false)
});

const IntervalSchema = z.object({
  intervalNumber: z.number(),
  summary: z.string(),
  pathwayStartDate: z.coerce.date().optional(),
  pathwayEndDate: z.coerce.date().optional(),
  tasks: z.array(TaskSchema)
});

const PathwayResponseSchema = z.object({
  topic: z.string(),
  intervals: z.number(),
  intervalType: z.string(),
  pathway: z.array(IntervalSchema)
});

const PathwaySchema = z.object({
  "_id": z.string(),
  "userId": z.string(),
  "topic": z.string(),
  "description": z.string(),
  "duration": z.number(),
  "startDate": z.coerce.date().optional(),
  "endDate": z.coerce.date().optional(),
  "isActive": z.boolean().default(false),
  "response": PathwayResponseSchema,
})

const convertResourceTypes = {
  "documentation": "Documentation",
  "video": "Video",
  "video tutorial": "Video Tutorial",
  "interactive exercise": "Interactive Exercise"
}

const convertFetchedPathwayToPathway = (pathwayData) => {
  return {
    "_id": pathwayData.id,
    userId: pathwayData.userId,
    topic: pathwayData.topic,
    description: pathwayData.description,
    duration: pathwayData.duration,
    isActive: false,
    response: {
      topic: pathwayData.topic,
      intervals: pathwayData.intervals,
      intervalType: pathwayData.intervalType,
      pathway: pathwayData.pathway.map((interval) => {
        interval.tasks = interval.tasks.map((task) => {
          task.resources = task.resources.map((resource) => {
            resource.type = convertResourceTypes[resource.type];
            return resource;
          });
          return task;
        });
        return interval;
      }),
    }
  }
}

const validatePathway = (data) => {
  try {
    const result = PathwaySchema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      throw result.error.format();
    }
  } catch (error) {
    throw error;
  }
}

class Pathway {
  constructor(pathwayData) {
    const convertedPathway = convertFetchedPathwayToPathway(pathwayData);
    this.data = validatePathway(convertedPathway);
  }

  markAsDone(intervalNumber, taskNumber) {
    const task = this.data.response.pathway[intervalNumber].tasks.filter((task) => task.taskNumber === taskNumber)[0];
    if (!task.isDone || !task.completedDate) {
      task.isDone = true;
      task.completedDate = new Date();
      if (task.scheduledDate && task.scheduledDate < task.completedDate) {
        task.lateMark = true;
      }
    }
    this.data.response.pathway[intervalNumber].tasks.filter((task) => task.taskNumber === taskNumber)[0] = task;
  }

  toTaskList() {
    const taskList = [];
    let taskNumber = 1;
    this.data.response.pathway.forEach((interval) => {
      interval.tasks.forEach((task) => {
        task.taskNumber = taskNumber;
        taskList.push(task);
        taskNumber++;
      })
    })
    return taskList;
  }

  populateWithDates(startDate) {
    this.data._id = new Date(startDate);
  }
}

export { Pathway, PathwaySchema };