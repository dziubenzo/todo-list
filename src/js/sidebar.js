import { Task } from './tasks';
import { generatePage, generateCompletedPage } from './DOM';
import { createP } from './helpers';

// Add listeners for three default tabs
export function handleTabs() {
  const allTasksPara = document.querySelector('.tabs .all-tasks');
  const comingUpPara = document.querySelector('.tabs .coming-up');
  const completedPara = document.querySelector('.tabs .completed');
  allTasksPara.addEventListener('click', () => {
    toggleSelectedTab(allTasksPara);
    Task.taskArrayMethod = 'getActiveTasks';
    generatePage();
  });

  comingUpPara.addEventListener('click', () => {
    toggleSelectedTab(comingUpPara);
    Task.taskArrayMethod = 'getComingUpTasks';
    generatePage();
  });

  completedPara.addEventListener('click', () => {
    toggleSelectedTab(completedPara);
    Task.taskArrayMethod = 'getCompletedTasks';
    generateCompletedPage();
  });
}

// Generate all list tabs
export function generateListTabs() {
  const parentDiv = document.querySelector('.sidebar .tabs');
  for (const list of Task.lists) {
    const para = createP(
      list,
      `lists-${list.replaceAll(' ', '-').toLowerCase()}`
    );
    parentDiv.append(para);
    para.addEventListener('click', () => {
      toggleSelectedTab(para);
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

// Remove selected class from all tabs
// Add selected class to the current tab
export function toggleSelectedTab(currentTab) {
  const tabs = document.querySelectorAll('.tabs p');
  for (const tab of tabs) {
    tab.classList.remove('selected');
  }
  currentTab.classList.add('selected');
}
