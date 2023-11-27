import { addDays } from 'date-fns';

export class Task {
  static tasks = [
    new Task(
      'Learn JS',
      'Learn some JS, dumbass',
      'Personal',
      'high',
      new Date(2023, 11, 15)
    ),
    new Task(
      'Learn React',
      'Learn some React, dumbass',
      'Work',
      'medium',
      new Date(2023, 11, 4)
    ),

    new Task(
      'Learn algorithms',
      'Learn some algorithms, dumbass',
      'Travel',
      'low',
      new Date(2023, 11, 3)
    ),
  ];
  static priorities = ['low', 'medium', 'high', 'yesterday'];
  static lists = ['Personal', 'Work', 'Travel'];

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

  constructor(title, description, list, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.priority = priority;
    this.completed = false;
    this.creationDate = new Date();
    this.dueDate = dueDate;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
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
}
