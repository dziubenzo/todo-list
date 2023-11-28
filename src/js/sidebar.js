import { Task } from './tasks';
import { generatePage, generateCompletedPage } from './DOM';
import { createP, createDiv, createImg } from './helpers';
import deleteListIconSrc from '../assets/delete-list.svg';

// Add listeners for three default tabs
export function handleTabs() {
  const allTasksPara = document.querySelector('.all-tasks p');
  const comingUpPara = document.querySelector('.coming-up p');
  const completedPara = document.querySelector('.completed p');
  allTasksPara.addEventListener('click', () => {
    toggleSelectedTab(allTasksPara.parentNode);
    Task.taskArrayMethod = 'getActiveTasks';
    generatePage();
  });

  comingUpPara.addEventListener('click', () => {
    toggleSelectedTab(comingUpPara.parentNode);
    Task.taskArrayMethod = 'getComingUpTasks';
    generatePage();
  });

  completedPara.addEventListener('click', () => {
    toggleSelectedTab(completedPara.parentNode);
    Task.taskArrayMethod = 'getCompletedTasks';
    generateCompletedPage();
  });
}

// Generate all list tabs together with Delete buttons
export function generateListTabs() {
  const parentDiv = document.querySelector('.sidebar .tabs');
  for (const list of Task.lists) {
    const listDiv = createDiv(`lists-${list.replaceAll(' ', '-').toLowerCase()}`);
    const para = createP(list);
    const deleteIcon = createImg(
      deleteListIconSrc,
      'Delete List Icon',
      'delete-list-icon'
    );
    listDiv.append(para, deleteIcon);
    parentDiv.append(listDiv);
    para.addEventListener('click', () => {
      toggleSelectedTab(para.parentNode);
      Task.taskArrayMethod = 'getTasksByList';
      Task.taskArraySortedInto = 'lists';
      Task.taskArraySortedIntoIndex = Task.lists.indexOf(list);
      generatePage();
    });
  }
}

// Remove all list tabs
export function removeListTabs() {
  const listTabs = document.querySelectorAll('div[class^="lists-"');
  for (const list of listTabs) {
    list.remove();
  }
}

// Remove selected class from all tabs
// Add selected class to the current tab
export function toggleSelectedTab(currentTabDiv) {
  const tabs = document.querySelectorAll('.tabs div');
  for (const tab of tabs) {
    tab.classList.remove('selected');
  }
  currentTabDiv.classList.add('selected');
}

// Delete created list
export function deleteList() {}
