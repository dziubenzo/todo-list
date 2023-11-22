import '../css/main.scss';
import { tasks } from './tasks';
import { displayAllTasks, showTaskDetails } from './DOM';

displayAllTasks();
showTaskDetails(tasks[0]);
