import '../css/main.scss';
import { Task } from './tasks';
import {
  displayTasks,
  listenForTitleClick,
  createAddTaskButton,
  listenForDeleteClick,
  listenForCheckboxClick,
} from './DOM';

// Show active tasks by default
export let taskFilter = () => Task.getActiveTasks();

displayTasks(taskFilter());
createAddTaskButton(taskFilter());
listenForTitleClick(taskFilter());
listenForDeleteClick(taskFilter());
listenForCheckboxClick(taskFilter());
