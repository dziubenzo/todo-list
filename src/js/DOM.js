import { tasks } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';

const contentDiv = document.querySelector('.content');

// Display all tasks
function displayAllTasks() {
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add(`task-${index}`);
    contentDiv.append(taskDiv);

    const checkbox = document.createElement('img');
    checkbox.src = checkboxSrc;
    checkbox.classList.add('checkbox');
    checkbox.alt = 'Checkbox';

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerHTML = task.title;

    const dueDate = document.createElement('p');
    dueDate.classList.add('due-date');
    dueDate.innerHTML = task.dueDate;

    taskDiv.append(checkbox, title, dueDate);
  });
}

export { displayAllTasks };
