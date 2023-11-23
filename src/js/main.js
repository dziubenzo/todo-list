import '../css/main.scss';
import { Task, tasks } from './tasks';
import { displayAllTasks, listenForTitleClick, displayAddTaskBtn } from './DOM';

displayAllTasks();
displayAddTaskBtn();
listenForTitleClick();