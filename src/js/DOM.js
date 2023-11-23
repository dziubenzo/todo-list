import { Task, tasks } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';
import addIconSrc from '../assets/add-task.svg';
import {
  createH,
  createDiv,
  createP,
  createImg,
  createSpan,
  insertAfter,
  createInputDate,
  createRadioButtonGroup,
  createDropDownList,
  createLabel,
  createInputText,
  createTextarea,
} from './helpers';

const contentDiv = document.querySelector('.content');

// Display add task button
// Listen for it
export function displayAddTaskBtn() {
  const addBtn = createDiv(`add-task`);
  contentDiv.append(addBtn);

  const addIcon = createImg(addIconSrc, 'Add Task Button', 'add-task-btn');
  addBtn.append(addIcon);

  // Show add task form and hide add task form when clicked
  addBtn.addEventListener('click', () => {
    showAddTaskForm(addBtn);
    hideAddTaskBtn(addBtn);
  });
}

// Hide add task button
function hideAddTaskBtn(addTaskButton) {
  addTaskButton.style.display = 'none';
}

// Show form for adding a new task
function showAddTaskForm(insertBeforeElement) {
  const heading = createH(2, 'Add New Task', 'add-task-heading');
  const addTaskForm = createDiv('add-task-form');
  const titleLabel = createLabel('Title', 'title');
  const descriptionLabel = createLabel('Description', 'description');
  const listLabel = createLabel('List', 'list');
  const priorityLabel = createLabel('Priority', 'priority');
  const dueDateLabel = createLabel('Due Date', 'due-date');

  const titleInput = createInputText(
    'title',
    'title',
    3,
    48,
    'Title (3 to 48 characters)',
    true
  );
  const descriptionInput = createTextarea(
    'description',
    'description',
    5,
    3,
    250,
    'Description (3 to 250 characters)'
  );
  const priorityRadioButtons = createRadioButtonGroup(
    '',
    '',
    Task.priorities,
    'priorities-add-task'
  );
  const listDropDown = createDropDownList('', '', 'list', 'list', Task.lists);
  const dueDatePicker = createInputDate(new Date(), true);
  addTaskForm.append(
    heading,
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    listLabel,
    listDropDown,
    priorityLabel,
    priorityRadioButtons,
    dueDateLabel,
    dueDatePicker
  );
  insertBeforeElement.parentNode.insertBefore(addTaskForm, insertBeforeElement);
}

// Display all tasks
export function displayAllTasks() {
  tasks.forEach((task, index) => {
    const taskDiv = createDiv(`task-${index}`);
    contentDiv.append(taskDiv);

    const checkbox = createImg(checkboxSrc, 'Checkbox', 'checkbox');
    const title = createP(task.title, 'title');
    const dueDate = createP(task.dueDate.toLocaleDateString('pl'), 'due-date');
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
  const dueDateSpan = createSpan('Due Date');
  const creationDateSpan = createSpan('Created On');
  // const completionDateSpan = createSpan('Completed on');

  const title = createP(task.title, 'title-details');
  title.contentEditable = 'true';
  const description = createP(task.description, 'description-details');
  description.contentEditable = 'true';
  const list = createDropDownList(
    task,
    index,
    'lists',
    'lists-select',
    Task.lists,
    'lists-details'
  );
  const priority = createRadioButtonGroup(
    task,
    index,
    Task.priorities,
    'priorities-details'
  );
  const dueDate = createInputDate(task.dueDate, true, 'due-date-details');
  const creationDate = createP(
    task.creationDate.toLocaleDateString('pl'),
    'creation-date-details'
  );
  // const completionDate = createP(
  //   task.completionDate,
  //   'completion-date-details'
  // );

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
    creationDate
    // completionDateSpan,
    // completionDate
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
      editTask(title, index);
      title.addEventListener('click', function hideDetails(event) {
        event.target.parentNode.nextSibling.remove();
        title.removeEventListener('click', hideDetails);
        title.addEventListener('click', showDetails);
      });
    });
  });
}

// Edit task details (title, description, list, priority, due date)
function editTask(titleClicked, index) {
  // Select editable elements in the opened task details
  const editableTitle = titleClicked.parentNode.nextSibling.querySelector(
    "p[class='title-details'"
  );
  const editableDescription = titleClicked.parentNode.nextSibling.querySelector(
    "p[class='description-details'"
  );
  const editableDueDate =
    titleClicked.parentNode.nextSibling.querySelector("input[type='date']");
  const editablePriorities =
    titleClicked.parentNode.nextSibling.querySelectorAll("input[type='radio']");
  const editableList =
    titleClicked.parentNode.nextSibling.querySelector('select');

  // Listen for changes and change values in the Task objects
  // Update task title value dynamically
  editableTitle.addEventListener('input', () => {
    tasks[index].updateTitle(editableTitle.innerHTML);
    titleClicked.innerHTML = tasks[index].title;
  });
  editableDescription.addEventListener('input', () => {
    tasks[index].updateDescription(editableDescription.innerHTML);
  });
  // Update due date value dynamically
  editableDueDate.addEventListener('change', () => {
    tasks[index].updateDueDate(new Date(editableDueDate.value));
    titleClicked.nextSibling.innerHTML =
      tasks[index].dueDate.toLocaleDateString('pl');
  });
  // Update priority
  editablePriorities.forEach((priorityInput) => {
    priorityInput.addEventListener('change', () => {
      tasks[index].updatePriority(priorityInput.value);
    });
  });
  // Update list
  editableList.addEventListener('change', () => {
    tasks[index].updateList(editableList.value);
  });
}
