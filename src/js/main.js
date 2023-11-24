import '../css/main.scss';
import { Task, tasks } from './tasks';
import { displayAllTasks, listenForTitleClick, createAddTaskBtn } from './DOM';

displayAllTasks();
createAddTaskBtn();
listenForTitleClick();
