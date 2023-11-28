import '../css/main.scss';
import { Task } from './tasks';
import { generatePage } from './DOM';
import {
  handleTabs,
  generateListTabs,
  listenForDeleteListClick,
} from './sidebar';
import { createAddListButton } from './DOM';

// Show all uncompleted tasks by default
generatePage(Task.taskArrayMethod);
handleTabs();
generateListTabs();
createAddListButton();
