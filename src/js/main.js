import '../css/main.scss';
import { Task } from './tasks';
import {
  displayTasks,
  listenForTitleClick,
  createAddTaskButton,
  listenForDeleteClick,
  listenForCheckboxClick,
  generatePage,
} from './DOM';

// Show all active tasks by default
export let filteredTasks = () => Task.getActiveTasks();

generatePage(filteredTasks());
