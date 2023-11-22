import { tasks } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';
import { createDiv, createP, createImg, createSpan, insertAfter } from './helpers';

const contentDiv = document.querySelector('.content');

// Display all tasks
export function displayAllTasks() {
  tasks.forEach((task, index) => {
    const taskDiv = createDiv(`task-${index}`);
    contentDiv.append(taskDiv);

    const checkbox = createImg(checkboxSrc, 'Checkbox', 'checkbox');
    const title = createP(task.title, 'title');
    const dueDate = createP(task.dueDate, 'due-date');
    taskDiv.append(checkbox, title, dueDate);
  });
}

// Show task details
export function showTaskDetails(task) {
  const detailsDiv = createDiv('details');
  const clickedTask = document.querySelector('div.task-0');
  insertAfter(detailsDiv, clickedTask);

  const test = createSpan('Test');
  const title = createP(task.title, 'title');
  const description = createP(
    task.description,
    'description'
  );
  const list = createP(task.list, 'list');
  const priority = createP(task.priority, 'priority');
  const dueDate = createP(task.dueDate);
  const creationDate = createP(task.creationDate);
  const completionDate = createP(task.completionDate);

  detailsDiv.append(
    test,
    title,
    description,
    list,
    priority,
    dueDate,
    creationDate,
    completionDate
  );
}
