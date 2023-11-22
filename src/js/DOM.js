import { tasks } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';
import { createDiv, createP, createImg } from './helpers';

const contentDiv = document.querySelector('.content');

// Display all tasks
function displayAllTasks() {
  tasks.forEach((task, index) => {
    const taskDiv = createDiv(`task-${index}`);
    contentDiv.append(taskDiv);

    const checkbox = createImg(checkboxSrc, 'Checkbox', 'checkbox');
    const title = createP(task.title, 'title');
    const dueDate = createP(task.dueDate, 'due-date');
    taskDiv.append(checkbox, title, dueDate);
  });
}

export { displayAllTasks };
