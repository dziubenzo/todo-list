import { Task } from './tasks';
import { generatePage } from './DOM';

export function handleTabs() {

  // generatePage(Task.getActiveTasks());

  const allTasksBtn = document.querySelector('.sidebar .all-tasks');
  const comingUpBtn = document.querySelector('.sidebar .coming-up');
  allTasksBtn.addEventListener('click', () => {
    const filteredTasks = () => Task.getActiveTasks();
    generatePage(filteredTasks());
  });

  comingUpBtn.addEventListener('click', () => {
    const filteredTasks = () => Task.getTasksByList(Task.lists[0]);
    generatePage(filteredTasks());
  });
}
