import { updatePathway } from '@/Firebase/services/pathway.service';
import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';
import axios from 'axios';
import { checkIfBadgeIsPresent } from '@/Firebase/services/badge.service';
import { BACKEND_URL } from '../core/Constants';

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
  scheduledDate: z.date().nullable(),
  completedDate: z.date().nullable(),
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
  pathwayStartDate: z.date().nullable(),
  pathwayEndDate: z.date().nullable(),
  tasks: z.array(TaskSchema)
});

const PathwayResponseSchema = z.object({
  topic: z.string(),
  intervals: z.number(),
  intervalType: z.string(),
  pathway: z.array(IntervalSchema)
});

const PathwaySchema = z.object({
  id: z.string().default(''),
  userId: z.string(),
  topic: z.string(),
  description: z.string(),
  duration: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  isActive: z.boolean().default(false),
  haveBeenPaused: z.boolean().default(false),
  response: PathwayResponseSchema,
  createdAt: z.string(),
  updatedAt: z.string()
});

const RESOURCE_TYPE_MAP = {
  documentation: 'Documentation',
  video: 'Video',
  'video tutorial': 'Video Tutorial',
  'interactive exercise': 'Interactive Exercise'
};

const checkForPossibleBadgeAwards = async (pathway) => {
  const { userId } = pathway.data;

  const possibleBadges = ['one_task', 'ten_tasks', 'fifteen_tasks', 'one_pathway'];

  for (const badgeType of possibleBadges) {
    const isBatchAlreadyAwarded = await checkIfBadgeIsPresent(userId, badgeType);
    console.log('Is batch already awarded:', isBatchAlreadyAwarded);
    if (!isBatchAlreadyAwarded) {
      switch (badgeType) {
        case 'one_task': {
          if (pathway.toTaskList().findIndex((task) => task.isDone) !== -1) {
            await awardBadge(userId, 'one_task');
          }
          break;
        }
        case 'ten_tasks': {
          if (pathway.toTaskList().filter((task) => task.isDone).length >= 10) {
            await awardBadge(userId, 'ten_tasks');
          }
          break;
        }
        case 'fifteen_tasks': {
          if (pathway.toTaskList().filter((task) => task.isDone).length >= 15) {
            await awardBadge(userId, 'fifteen_tasks');
          }
          break;
        }
        case 'one_pathway': {
          if (pathway.toTaskList().every((task) => task.isDone)) {
            await awardBadge(userId, 'one_pathway');
          }
          break;
        }
      }
      console.log('Badge awarded successfully');
    }
  }
};

const checkProgressAndSendNotifs = async (pathway) => {
  const { userId, id: pathwayId, isActive } = pathway.data;

  if (!isActive) return;

  const taskList = pathway.toTaskList();
  const completedTaskList = taskList.filter((task) => task.isDone);
  const progressPercentage = Math.round((completedTaskList.length / taskList.length) * 100);

  try {
    if (progressPercentage < 50) {
      return;
    }

    console.log('User ID:', userId, 'Pathway ID:', pathwayId, 'Progress:', progressPercentage);

    const url = `${BACKEND_URL}/user/${userId}/pathway/${pathwayId}`;

    await axios.post(url, null, {
      params: { progress: progressPercentage }
    });

    console.log('Progress notification sent successfully.');
  } catch (error) {
    console.error('Error updating pathway progress:', error.message);
  }
};

/**
 * Calculates evenly distributed dates for tasks within an interval
 * @param {Date} intervalStart - Start date of the interval
 * @param {Date} intervalEnd - End date of the interval
 * @param {number} taskCount - Number of tasks in the interval
 * @returns {Date[]} Array of calculated dates for tasks
 */
const calculateTaskDates = (intervalStart, intervalEnd, taskCount) => {
  const dates = [];
  const totalDuration = intervalEnd.getTime() - intervalStart.getTime();
  const segmentDuration = totalDuration / (taskCount + 1);

  for (let i = 1; i <= taskCount; i++) {
    const taskDate = normalizeDate(new Date(intervalStart.getTime() + segmentDuration * i));
    console.log(taskDate);
    dates.push(taskDate);
  }

  return dates;
};

function normalizeDate(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Initializes dates for an interval and its tasks
 * @param {Object} interval - Interval to initialize dates for
 * @param {Date} startDate - Start date for the interval
 * @param {number} intervalDuration - Duration of the interval in days
 * @returns {Object} Interval with initialized dates
 */
const initializeIntervalDates = (interval, startDate, intervalDuration) => {
  const intervalStartDate = normalizeDate(new Date(startDate.getTime()));
  const intervalEndDate = normalizeDate(new Date(startDate.getTime()));
  intervalEndDate.setDate(intervalStartDate.getDate() + intervalDuration);

  const taskDates = calculateTaskDates(intervalStartDate, intervalEndDate, interval.tasks.length);

  const updatedTasks = interval.tasks.map((task, index) => ({
    ...task,
    isDone: false,
    lateMark: false,
    scheduledDate: taskDates[index],
    completedDate: task.isDone ? normalizeDate(task.completedDate) : null
  }));

  return {
    ...interval,
    pathwayStartDate: intervalStartDate,
    pathwayEndDate: intervalEndDate,
    tasks: updatedTasks
  };
};

/**
 * Converts a Gemini-generated pathway to the correct database format
 * @param {Object} pathwayData - Raw pathway data from Gemini
 * @param {string} userId - User ID for the pathway
 * @returns {Object} Formatted pathway data matching PathwaySchema
 */
const convertGeminiPathwayToDBFormat = (pathwayData, userId) => {
  const formattedPathway = {
    id: crypto.randomUUID(),
    userId,
    topic: pathwayData.topic,
    description: pathwayData.description,
    duration: pathwayData.duration,
    startDate: null,
    endDate: null,
    isActive: false,
    haveBeenPaused: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    response: {
      topic: pathwayData.topic,
      intervals: pathwayData.intervals,
      intervalType: pathwayData.intervalType,
      pathway: pathwayData.pathway.map((interval) => ({
        ...interval,
        pathwayStartDate: null,
        pathwayEndDate: null,
        tasks: interval.tasks.map((task) => ({
          ...task,
          scheduledDate: null,
          completedDate: null,
          isDone: false,
          lateMark: false,
          completionEmailSent: false,
          deadlineEmailSent: false,
          resources: task.resources.map((resource) => ({
            ...resource,
            type: RESOURCE_TYPE_MAP[resource.type.toLowerCase()]
          }))
        }))
      }))
    }
  };

  return validatePathway(formattedPathway);
};

/**
 * Validates pathway data against the PathwaySchema
 * @param {Object} data - Pathway data to validate
 * @returns {Object} Validated pathway data
 * @throws {Error} If validation fails
 */
const validatePathway = (data) => {
  try {
    const result = PathwaySchema.safeParse(data);
    if (!result.success) {
      throw result.error.format();
    }
    return result.data;
  } catch (error) {
    console.error('Pathway validation failed:', error);
    throw error;
  }
};

class Pathway {
  constructor(geminiPathwayData, userId = null) {
    if (userId) {
      this.data = convertGeminiPathwayToDBFormat(geminiPathwayData, userId);
    } else {
      this.data = convertTimestampsToDates(geminiPathwayData);
    }
  }

  /**
   * Starts or resumes the pathway, initializing all necessary dates
   * @param {Date} startDate - Date to start/resume the pathway from
   */
  startPathway(startDate = new Date()) {
    startDate = normalizeDate(startDate);
    const intervalDuration = Math.floor(this.data.duration / this.data.response.intervals);

    // Convert to Firestore Timestamps
    this.data.startDate = startDate;
    this.data.endDate = normalizeDate(
      new Date(startDate.getTime() + this.data.duration * 24 * 60 * 60 * 1000)
    );
    this.data.isActive = true;

    this.data.response.pathway = this.data.response.pathway.map((interval, index) => {
      const intervalStartDate = normalizeDate(
        new Date(startDate.getTime() + index * intervalDuration * 24 * 60 * 60 * 1000)
      );
      return initializeIntervalDates(interval, intervalStartDate, intervalDuration);
    });

    updatePathway(this.data.id, this.data)
      .then((result) => {
        this.data = result;
      })
      .catch((error) => console.error('Error starting pathway:', error));
  }

  /**
   * Pauses the pathway, preserving completed task dates
   */
  pausePathway() {
    this.data.isActive = false;
    this.data.endDate = null;
    this.data.haveBeenPaused = true;

    this.data.response.pathway = this.data.response.pathway.map((interval) => ({
      ...interval,
      pathwayStartDate: null,
      pathwayEndDate: null,
      tasks: interval.tasks.map((task) => ({
        ...task,
        scheduledDate: task.isDone ? task.scheduledDate : null
      }))
    }));

    updatePathway(this.data.id, this.data)
      .then((result) => {
        this.data = result;
      })
      .catch((error) => console.error('Error starting pathway:', error));
  }

  /**
   * Resumes the pathway, rescheduling only the tasks that are not done
   * Preserves completed task dates and interval history
   * @param {Date} resumeDate - Date to resume the pathway from
   */
  resumePathway(resumeDate = new Date()) {
    resumeDate = normalizeDate(resumeDate);
    const intervalDuration = Math.floor(this.data.duration / this.data.response.intervals);

    // Ensure pathway remains active
    this.data.isActive = true;

    this.data.response.pathway = this.data.response.pathway.map((interval, index) => {
      const newIntervalStartDate = normalizeDate(
        new Date(resumeDate.getTime() + index * intervalDuration * 24 * 60 * 60 * 1000)
      );

      // If all tasks in the interval are done, preserve interval dates
      const allTasksDone = interval.tasks.every((task) => task.isDone);
      if (allTasksDone) {
        return interval;
      }

      const intervalStartDate = interval.pathwayStartDate || newIntervalStartDate;
      const intervalEndDate =
        interval.pathwayEndDate ||
        normalizeDate(
          new Date(intervalStartDate.getTime() + intervalDuration * 24 * 60 * 60 * 1000)
        );

      const taskDates = calculateTaskDates(
        intervalStartDate,
        intervalEndDate,
        interval.tasks.length
      );

      return {
        ...interval,
        pathwayStartDate: intervalStartDate, // Preserve if already set
        pathwayEndDate: intervalEndDate,
        tasks: interval.tasks.map((task, taskIndex) => ({
          ...task,
          scheduledDate: task.isDone ? task.scheduledDate : taskDates[taskIndex]
        }))
      };
    });

    updatePathway(this.data.id, this.data)
      .then((result) => {
        this.data = result;
      })
      .catch((error) => console.error('Error resuming pathway:', error));
  }

  /**
   * Marks a specific task as done
   * @param {number} intervalNumber - Interval number
   * @param {number} taskNumber - Task number
   */
  markAsDone(intervalNumber, taskNumber) {
    if (!this.data.isActive) return;

    const task = this.data.response.pathway[intervalNumber - 1]?.tasks.find(
      (task) => task.taskNumber === taskNumber
    );

    if (!task) {
      throw new Error('Task not found');
    }

    if (!task.isDone) {
      task.isDone = true;
      task.completedDate = normalizeDate(new Date());
      task.lateMark = task.scheduledDate && task.scheduledDate < task.completedDate;
    }

    updatePathway(this.data.id, this.data)
      .then((result) => {
        this.data = result;
      })
      .catch((error) => console.error('Error updating pathway:', error));

    checkProgressAndSendNotifs(this)
      .then(() => console.log('Notification sent'))
      .catch((error) => console.error('Error sending notification:', error));

    checkForPossibleBadgeAwards(this)
      .then(() => console.log('Badge awarded'))
      .catch((error) => console.error('Error awarding badge:', error));
  }

  /**
   * Converts pathway intervals into a flat task list
   * @returns {Array} Flat array of all tasks
   */
  toTaskList() {
    let taskNumber = 1;
    return this.data.response.pathway.flatMap((interval) =>
      interval.tasks.map((task) => ({
        ...task,
        taskNumber: taskNumber++
      }))
    );
  }

  /**
   * Gets the data in database-ready format
   * @returns {Object} Formatted pathway data
   */
  toDBFormat() {
    return this.data;
  }
}

export { Pathway, PathwaySchema, convertGeminiPathwayToDBFormat, validatePathway };

/* 
// When user wants to start the pathway
pathway.startPathway(new Date());

// When user wants to pause
pathway.pausePathway();

// When user wants to resume
pathway.startPathway(new Date());

// Save to database
await addPathway(userId, pathway.toDBFormat());
*/

function convertTimestampsToDates(obj) {
  if (obj !== null && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Timestamp) {
          obj[key] = obj[key].toDate();
        } else if (typeof obj[key] === 'object') {
          // Recursively convert dates in nested objects
          convertTimestampsToDates(obj[key]);
        }
      }
    }
  }
  return obj;
}
