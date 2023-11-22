import { tasks } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';
import {
  createDiv,
  createP,
  createImg,
  createSpan,
  insertAfter,
} from './helpers';

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

  const titleSpan = createSpan('Title');
  const descriptionSpan = createSpan('Description');
  const listSpan = createSpan('List');
  const prioritySpan = createSpan('Priority');
  const dueDateSpan = createSpan('Due date');
  const creationDateSpan = createSpan('Created on');
  const completionDateSpan = createSpan('Completed on');

  const title = createP(task.title, 'title-details');
  const description = createP(task.description, 'description-details');
  const list = createP(task.list, 'list-details');
  const priority = createP(task.priority, 'priority-details');
  const dueDate = createP(task.dueDate, 'due-date-details');
  const creationDate = createP(task.creationDate, 'creation-date-details');
  const completionDate = createP(
    task.completionDate,
    'completion-date-details'
  );

  detailsDiv.append(
    titleSpan,
    title,
    descriptionSpan,
    description,
    listSpan,
    list,
    prioritySpan,
    priority,
    dueDateSpan,
    dueDate,
    creationDateSpan,
    creationDate,
    completionDateSpan,
    completionDate
  );
}
