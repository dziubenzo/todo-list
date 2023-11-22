import '../css/main.scss';
import { tasks } from './tasks';
import { displayAllTasks, listenForTitleClick } from './DOM';

console.table(tasks[0]);

displayAllTasks();
listenForTitleClick();
