import '../css/main.scss';
import { Task, tasks } from './tasks';
import {
  displayAllTasks,
  listenForTitleClick,
  createAddTaskBtn,
  listenForDeleteClick,
  listenForCheckboxClick,
} from './DOM';

displayAllTasks();
createAddTaskBtn();
listenForTitleClick();
listenForDeleteClick();
listenForCheckboxClick();
