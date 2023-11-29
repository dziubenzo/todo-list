import '../css/main.scss';
import { Task, getTasksFromLocalStorage, getListsFromLocalStorage } from './tasks';
import { generatePage } from './DOM';
import { handleTabs, generateListTabs } from './sidebar';
import { createAddListButton } from './DOM';

getTasksFromLocalStorage();
getListsFromLocalStorage();
// Show all uncompleted tasks by default
generatePage(Task.taskArrayMethod);
handleTabs();
generateListTabs();
createAddListButton();