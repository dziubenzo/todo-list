import '../css/main.scss';
import {
  Task,
  getTasksFromLocalStorage,
  getListsFromLocalStorage,
} from './tasks';
import {
  generatePage,
  showOrHideSidebar,
  listenForContentDivClick,
  loadIcons,
} from './DOM';
import { handleTabs, generateListTabs } from './sidebar';
import { createAddListButton } from './DOM';

getTasksFromLocalStorage();
getListsFromLocalStorage();
// Show all uncompleted tasks by default
generatePage(Task.taskArrayMethod);
loadIcons();
handleTabs();
generateListTabs();
createAddListButton();
// Functions/listeners for small-width devices
showOrHideSidebar();
listenForContentDivClick();
