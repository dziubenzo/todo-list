import '../css/main.scss';
import { Task } from './tasks';
import { generatePage } from './DOM';
import { handleTabs } from './sidebar';

// Show all uncompleted tasks by default
generatePage(Task.getActiveTasks());
handleTabs();

// setInterval(() => {
//   console.table(Task.tasks);
// }, 2000);
