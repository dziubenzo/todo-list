import { Task } from './tasks';
import { generatePage, generateCompletedPage } from './DOM';

export function handleTabs() {
  const allTasksBtn = document.querySelector('.sidebar .all-tasks');
  const comingUpBtn = document.querySelector('.sidebar .coming-up');
  const completedBtn = document.querySelector('.sidebar .completed');
  allTasksBtn.addEventListener('click', () => {
    Task.taskArrayMethod = 'getActiveTasks';
    generatePage();
  });

  comingUpBtn.addEventListener('click', () => {
    Task.taskArrayMethod = 'getComingUpTasks';
    generatePage();
  });

  completedBtn.addEventListener('click', () => {
    Task.taskArrayMethod = 'getCompletedTasks';
    generateCompletedPage();
  });
}