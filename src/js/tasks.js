import { addDays, setHours, setMinutes, setSeconds } from 'date-fns';

export class Task {
  static tasks = [];
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

  static addList(newList) {
    return Task.lists.push(newList);
  }

  static deleteList(list) {
    const listIndex = Task.lists.indexOf(list);
    Task.lists.splice(listIndex, 1);
  }

  // Add task from a JSON-parsed object to the tasks array
  static addTaskFromLocalStorage(task) {
    const taskToAdd = new Task(
      task.title,
      task.description,
      task.list,
      task.priority,
      new Date(task.dueDate)
    );
    taskToAdd.creationDate = new Date(task.creationDate);
    if (task.completed) {
      taskToAdd.completionDate = new Date(task.completionDate);
      taskToAdd.completed = task.completed;
    }
    Task.tasks.push(taskToAdd);
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

// Retrieve tasks stored in localStorage if they exist
// Turn them back into Task class instances
export function getTasksFromLocalStorage() {
  let taskObjects;
  if (localStorage.getItem('tasks')) {
    taskObjects = JSON.parse(localStorage.getItem('tasks'));
  }
  for (const task of taskObjects) {
    Task.addTaskFromLocalStorage(task);
  }
}

// Update tasks stored in localStorage
export function updateTasksInLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(Task.tasks));
}
