import '../css/main.scss';
import { Task } from './tasks';
import {
  displayAllTasks,
  listenForTitleClick,
  createAddTaskButton,
  listenForDeleteClick,
  listenForCheckboxClick,
} from './DOM';

// Show all tasks on page load
displayAllTasks(Task.tasks);
createAddTaskButton();
listenForTitleClick(Task.tasks);
listenForDeleteClick(Task.tasks);
listenForCheckboxClick();
