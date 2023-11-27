import '../css/main.scss';
import { Task } from './tasks';
import { generatePage } from './DOM';
import { handleTabs } from './sidebar';

// Show all uncompleted tasks by default
generatePage(Task.taskArrayMethod);
handleTabs();

console.log(Task.tasks[0])