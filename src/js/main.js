import '../css/main.scss';
import { Task } from './tasks';
import { handleTabs } from './sidebar';
import { generatePage } from './DOM';

// Show all active tasks by default
export const filteredTasks = () => Task.getActiveTasks();

generatePage(filteredTasks());
handleTabs();
