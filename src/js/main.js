import '../css/main.scss';
import { Task, getTasksFromLocalStorage } from './tasks';
import { generatePage } from './DOM';
import { handleTabs, generateListTabs } from './sidebar';
import { createAddListButton } from './DOM';

getTasksFromLocalStorage();
// Show all uncompleted tasks by default
generatePage(Task.taskArrayMethod);
handleTabs();
generateListTabs();
createAddListButton();