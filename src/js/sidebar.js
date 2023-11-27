import { Task } from './tasks';
import { generatePage } from './DOM';

export function handleTabs() {
  let taskArray;
  const allTasksBtn = document.querySelector('.sidebar .all-tasks');
  const comingUpBtn = document.querySelector('.sidebar .coming-up');
  allTasksBtn.addEventListener('click', () => {
    taskArray = Task.getActiveTasks();
    generatePage(taskArray);
  });

  comingUpBtn.addEventListener('click', () => {
    taskArray = Task.getComingUpTasks();
    generatePage(taskArray);
  });
}
