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

// Create a demonstration task once per device
if (!localStorage.getItem('tasks')) {
  Task.tasks.push(
    new Task(
      "I'm a demo task",
      "Yes. I am indeed a demo task. You will probably delete me, right? Sad, but that's just the way life goes...",
      'Personal',
      'low',
      new Date(2025, 11, 24)
    )
  );
}

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
