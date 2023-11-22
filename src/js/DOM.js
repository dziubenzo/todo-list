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

// Generate task details
export function generateTaskDetails(task, index) {
  const detailsDiv = createDiv('details');
  const clickedTask = document.querySelector(`div.task-${index}`);
  insertAfter(detailsDiv, clickedTask);

  const titleSpan = createSpan('Title');
  const descriptionSpan = createSpan('Description');
  const listSpan = createSpan('List');
  const prioritySpan = createSpan('Priority');
  const dueDateSpan = createSpan('Due date');
  const creationDateSpan = createSpan('Created on');
  const completionDateSpan = createSpan('Completed on');

  const title = createP(task.title, 'title-details');
  title.contentEditable = 'true';
  const description = createP(task.description, 'description-details');
  description.contentEditable = 'true';
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

// Listen for task title click
// Show or hide task details
export function listenForTitleClick() {
  const taskTitles = document.querySelectorAll('.title');

  taskTitles.forEach((title) => {
    title.addEventListener('click', function showDetails(event) {
      const index = event.target.parentNode.classList.value.substr(-1, 1);
      generateTaskDetails(tasks[index], index);
      title.removeEventListener('click', showDetails);
      changeTitleOrDescription(title, index);
      title.addEventListener('click', function hideDetails(event) {
        event.target.parentNode.nextSibling.remove();
        title.removeEventListener('click', hideDetails);
        title.addEventListener('click', showDetails);
      });
    });
  });
}

// Listen for value change in title or description in the opened task details
function changeTitleOrDescription(titleClicked, index) {
  // Select editable elements in the opened task details
  const editableTitle = titleClicked.parentNode.nextSibling.querySelector(
    "p[class='title-details'"
  );
  const editableDescription = titleClicked.parentNode.nextSibling.querySelector(
    "p[class='description-details'"
  );
  // Listen for changes and change values in the Task objects
  // Update task title value
  editableTitle.addEventListener('input', () => {
    tasks[index].title = editableTitle.innerHTML;
    titleClicked.innerHTML = tasks[index].title;
  });
  editableDescription.addEventListener('input', () => {
    tasks[index].description = editableDescription.innerHTML;
  });
}
