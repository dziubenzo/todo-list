import { Task } from './tasks';
import { generatePage, generateCompletedPage } from './DOM';
import { createP } from './helpers';

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

// Generate all list tabs
export function generateListTabs() {
  const parentDiv = document.querySelector('.sidebar .tabs');
  for (const list of Task.lists) {
    const para = createP(list, `lists-${list.toLowerCase()}`);
    parentDiv.append(para);
    para.addEventListener('click', () => {
      Task.taskArrayMethod = 'getTasksByList';
      Task.taskArraySortedInto = 'lists';
      Task.taskArraySortedIntoIndex = Task.lists.indexOf(list);
      generatePage();
    });
  }
}

// Remove all list tabs
export function removeListTabs() {
  const listTabs = document.querySelectorAll('p[class^="lists-"');
  for (const list of listTabs) {
    list.remove();
  }
}
