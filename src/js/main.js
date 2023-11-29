import '../css/main.scss';
import { Task } from './tasks';
import { generatePage } from './DOM';
import { handleTabs, generateListTabs } from './sidebar';
import { createAddListButton } from './DOM';

// Show all uncompleted tasks by default
getTasksFromLocalStorage();
generatePage(Task.taskArrayMethod);
handleTabs();
generateListTabs();
createAddListButton();

// Retrieve tasks stored in localStorage if they exist
// Turn them back into Task instances
export function getTasksFromLocalStorage() {
  let localStorageTasks;
  let taskObjects;
  if (localStorage.getItem('tasks')) {
    localStorageTasks = localStorage.getItem('tasks');
    taskObjects = JSON.parse(localStorageTasks);
  }
  for (const task in taskObjects) {
    Task.addTaskFromLocalStorage(task);
  }
}