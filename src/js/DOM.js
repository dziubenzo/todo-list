import { Task } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';
import checkedCheckboxSrc from '../assets/checkbox-checked.svg';
import addIconSrc from '../assets/add-task.svg';
import deleteTaskScr from '../assets/delete-task.svg';
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
  createForm,
  createButton,
} from './helpers';

// Create add task button
// Listen for it
export function createAddTaskBtn() {
  const contentDiv = document.querySelector('main .content');
  const addBtn = createDiv(`add-task`);
  contentDiv.append(addBtn);

  const addIcon = createImg(addIconSrc, 'Add Task Button', 'add-task-btn');
  addBtn.append(addIcon);

  // Show add task form and hide add task form when clicked
  addBtn.addEventListener('click', () => {
    createAddTaskForm(addBtn);
    removeAddTaskBtn(addBtn);
  });
}

// Remove add task button
function removeAddTaskBtn(addTaskButton) {
  addTaskButton.remove();
}

// Create and show form for adding a new task
function createAddTaskForm(addTaskButton) {
  const heading = createH(2, 'Add New Task', 'add-task-heading');
  const addTaskForm = createForm('add-task-form');
  const titleLabel = createLabel('Title', 'title');
  const descriptionLabel = createLabel('Description', 'description');
  const listLabel = createLabel('List', 'list');
  const priorityLabel = createLabel('Priority', 'priority');
  const dueDateLabel = createLabel('Due Date', 'due-date');

  const buttonsDiv = createDiv('add-task-form-buttons');
  const submitBtn = createButton('submit', 'Create');
  const cancelBtn = createButton('button', 'Cancel');
  buttonsDiv.append(submitBtn, cancelBtn);

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
    'Description (3 to 250 characters)',
    true
  );
  const priorityRadioButtons = createRadioButtonGroup(
    '',
    '',
    Task.priorities,
    'priorities-add-task'
  );
  const listDropDown = createDropDownList('', '', 'list', 'list', Task.lists);
  const dueDatePicker = createInputDate(new Date(), 'due-date', true);
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
    dueDatePicker,
    buttonsDiv
  );
  addTaskButton.parentNode.insertBefore(addTaskForm, addTaskButton);
  // Listen for form submission
  listenForNewTask(addTaskForm);
  // Listen for Cancel button click
  listenForCancelButton(cancelBtn, addTaskForm, addTaskButton);
}

// Add new task when the Create button is clicked
function listenForNewTask(formElement) {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    // Get form values
    const title = formElement.elements.title.value;
    const description = formElement.elements.description.value;
    const list = formElement.elements.list.value;
    const priority = formElement.elements.priority.value;
    const dueDate = new Date(formElement.elements['due-date'].value);
    // Create new Task instance and add it to the tasks array
    Task.tasks.push(new Task(title, description, list, priority, dueDate));
    // Refresh tasks
    removeTasks();
    displayAllTasks();
    createAddTaskBtn();
    listenForTitleClick();
    listenForDeleteClick();
  });
}

// Remove the add task form and recreate the add form button if the Cancel button is clicked
function listenForCancelButton(cancelButton, addTaskForm, addTaskButton) {
  cancelButton.addEventListener('click', () => {
    addTaskForm.remove();
    createAddTaskBtn();
  });
}

// Remove all tasks
function removeTasks() {
  const contentDiv = document.querySelector('main .content');
  const newContentDiv = createDiv('content');
  contentDiv.parentNode.append(newContentDiv);
  contentDiv.remove();
}

// Display all tasks
export function displayAllTasks() {
  const contentDiv = document.querySelector('main .content');
  Task.tasks.forEach((task, index) => {
    const taskDiv = createDiv(`task-${index}`);
    taskDiv.dataset.index = index;
    contentDiv.append(taskDiv);

    const checkbox = createImg(checkboxSrc, 'Checkbox Icon', 'checkbox-icon');
    const title = createP(task.title, 'title');
    const deleteIcon = createImg(
      deleteTaskScr,
      'Delete Task Icon',
      'delete-task-icon'
    );
    const dueDate = createP(task.dueDate.toLocaleDateString('pl'), 'due-date');
    taskDiv.append(checkbox, title, deleteIcon, dueDate);
  });
}

// Generate task details
export function generateTaskDetails(task, index) {
  const detailsDiv = createDiv(`details-task-${index}`);
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
  const dueDate = createInputDate(
    task.dueDate,
    'due-date-picker',
    true,
    'due-date-details'
  );
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
    title.addEventListener('click', function showDetails() {
      const index = title.parentNode.dataset.index;
      generateTaskDetails(Task.tasks[index], index);
      title.removeEventListener('click', showDetails);
      editTask(title, index);
      title.addEventListener('click', function hideDetails() {
        title.parentNode.nextSibling.remove();
        title.removeEventListener('click', hideDetails);
        title.addEventListener('click', showDetails);
      });
    });
  });
}

// Listen for delete task icon clicks
// Delete task from the tasks array
// Refresh tasks
export function listenForDeleteClick() {
  const deleteIcons = document.querySelectorAll('.delete-task-icon');

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      // Delete from the tasks array
      const index = deleteIcon.parentNode.dataset.index;
      Task.tasks.splice(index, 1);
      console.log(Task.prototype);
      // Refresh tasks
      removeTasks();
      displayAllTasks();
      createAddTaskBtn();
      listenForTitleClick();
      listenForDeleteClick();
    });
  });
}

// Listen for checkbox click
// Mark the task as completed
// Change icon to checked box
export function listenForCheckboxClick() {
  const checkboxIcons = document.querySelectorAll('.checkbox-icon');

  checkboxIcons.forEach((checkboxIcon) => {
    checkboxIcon.addEventListener('click', () => {
      const index = checkboxIcon.parentNode.dataset.index;
      Task.tasks[index].markAsCompleted();
      checkboxIcon.src = checkedCheckboxSrc;
      checkboxIcon.classList.replace('checkbox-icon', 'checkbox-checked-icon');
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

  // Listen for task edits and change corresponding values in Task objects
  // Update task title value dynamically
  editableTitle.addEventListener('input', () => {
    Task.tasks[index].updateTitle(editableTitle.innerHTML);
    titleClicked.innerHTML = Task.tasks[index].title;
  });
  editableDescription.addEventListener('input', () => {
    Task.tasks[index].updateDescription(editableDescription.innerHTML);
  });
  // Update due date value dynamically
  editableDueDate.addEventListener('change', () => {
    Task.tasks[index].updateDueDate(new Date(editableDueDate.value));
    titleClicked.nextSibling.innerHTML =
      Task.tasks[index].dueDate.toLocaleDateString('pl');
  });
  // Update priority
  editablePriorities.forEach((priorityInput) => {
    priorityInput.addEventListener('change', () => {
      Task.tasks[index].updatePriority(priorityInput.value);
    });
  });
  // Update list
  editableList.addEventListener('change', () => {
    Task.tasks[index].updateList(editableList.value);
  });
}
