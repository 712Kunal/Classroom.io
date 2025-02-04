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
  scheduledDate: z.coerce.date(),
  completedDate: z.coerce.date().nullable(),
  isDone: z.boolean(),
  lateMark: z.boolean(),
  resources: z.array(ResourceSchema),
  expectedOutcome: z.string(),
  completionEmailSent: z.boolean().optional().default(false),
  deadlineEmailSent: z.boolean().optional().default(false)
});

const IntervalSchema = z.object({
  intervalNumber: z.number(),
  summary: z.string(),
  pathwayStartDate: z.coerce.date(),
  pathwayEndDate: z.coerce.date(),
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
  "startDate": z.coerce.date(),
  "endDate": z.coerce.date(),
  "responseRaw": z.string(),
  "isActive": z.boolean(),
  "response": PathwayResponseSchema,
})

const validatePathway = (data) => {
  try {
    const result = PathwaySchema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      throw result.error.format();
    }
  } catch (error) {
    console.error('Pathway Validation Error:', JSON.stringify(error));
    throw error;
  }
}

class Pathway {
  constructor(pathwayData) {
    this.data = validatePathway(pathwayData);
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
    this.data.response.pathway.forEach((interval) => {
      interval.tasks.forEach((task) => {
        taskList.push(task);
      })
    })
    return taskList;
  }

  populateWithDates(startDate) {
    this.data._id = new Date(startDate);
  }
}

export { Pathway, PathwaySchema };