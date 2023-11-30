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
  toggleColourTheme,
  getColourThemeFromLocalStorage,
} from './DOM';
import { handleTabs, generateListTabs } from './sidebar';
import { createAddListButton } from './DOM';

getColourThemeFromLocalStorage();
getTasksFromLocalStorage();
getListsFromLocalStorage();
// Show all uncompleted tasks by default
generatePage(Task.taskArrayMethod);
loadIcons();
handleTabs();
generateListTabs();
createAddListButton();
toggleColourTheme();
// Functions/listeners for small-width devices
showOrHideSidebar();
listenForContentDivClick();
