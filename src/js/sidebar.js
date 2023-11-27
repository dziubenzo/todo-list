import { Task } from './tasks';
import { generatePage } from './DOM';

export function handleTabs() {
  const allTasksBtn = document.querySelector('.sidebar .all-tasks');
  const comingUpBtn = document.querySelector('.sidebar .coming-up');
  allTasksBtn.addEventListener('click', () => {
    Task.taskArrayMethod = 'getActiveTasks';
    generatePage();
  });

  comingUpBtn.addEventListener('click', () => {
    Task.taskArrayMethod = 'getComingUpTasks';
    generatePage();
  });
}
