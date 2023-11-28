import { addDays, setHours, setMinutes, setSeconds } from 'date-fns';

export class Task {
  static tasks = [
    new Task(
      'Learn JS',
      'Learn some JS, dumbass',
      'Personal',
      'high',
      new Date(2023, 11, 15, 23, 59, 59)
    ),
    new Task(
      'Learn React',
      'Learn some React, dumbass',
      'Work',
      'medium',
      new Date(2023, 11, 4, 23, 59, 59)
    ),

    new Task(
      'Learn algorithms',
      'Learn some algorithms, dumbass',
      'Travel',
      'low',
      new Date(2023, 11, 3, 23, 59, 59)
    ),
  ];
  static priorities = ['low', 'medium', 'high', 'yesterday'];
  static lists = ['Personal', 'Work', 'Travel'];
  static taskArrayMethod = 'getActiveTasks';
  static taskArraySortedInto;
  static taskArraySortedIntoIndex;

  // Sort tasks by due date (short to long)
  static sort(taskArray) {
    return taskArray.sort((a, b) => {
      if (a.dueDate < b.dueDate) {
        return -1;
      }
      if (a.dueDate > b.dueDate) {
        return 1;
      }
      return 0;
    });
  }

  static getActiveTasks() {
    Task.sort(Task.tasks);
    return Task.tasks.filter((task) => task.completed === false);
  }

  static getTasksByList(list) {
    return Task.getActiveTasks().filter((task) => task.list === list);
  }

  static getTasksByPriority(priority) {
    return Task.getActiveTasks().filter((task) => task.priority === priority);
  }

  // Filter tasks by those whose due date is within a week
  static getComingUpTasks() {
    const weekLater = addDays(new Date(), 7);
    return Task.getActiveTasks().filter((task) => task.dueDate <= weekLater);
  }

  static getCompletedTasks() {
    return Task.tasks.filter((task) => task.completed === true);
  }

  constructor(title, description, list, priority, dueDate) {
    this.title = title.trim();
    this.description = description.trim();
    this.list = list;
    this.priority = priority;
    this.completed = false;
    this.creationDate = new Date();
    this.dueDate = dueDate;
  }

  updateTitle(newTitle) {
    this.title = newTitle.trim();
  }

  updateDescription(newDescription) {
    this.description = newDescription.trim();
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateList(newList) {
    this.list = newList;
  }

  markAsCompleted() {
    this.completed = true;
    this.completionDate = new Date();
  }

  // Undo marking task as completed
  // Set due date to tomorrow, 23:59:59 by default
  undoCompleted() {
    this.completed = false;
    delete this.completionDate;
    this.dueDate = addDays(new Date(), 1);
    this.dueDate = setHours(this.dueDate, 23);
    this.dueDate = setMinutes(this.dueDate, 59);
    this.dueDate = setSeconds(this.dueDate, 59);
  }
}
