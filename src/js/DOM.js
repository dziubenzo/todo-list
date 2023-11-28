import { Task } from './tasks';
import { generateListTabs, removeListTabs } from './sidebar';
import checkboxSrc from '../assets/checkbox.svg';
import checkboxCheckedSrc from '../assets/checkbox-checked.svg';
import addTaskIconSrc from '../assets/add-task.svg';
import addListIconSrc from '../assets/add-list.svg';
import createIconScr from '../assets/confirm-list.svg';
import cancelIconScr from '../assets/cancel-list.svg';
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
import {
  formatDistanceToNow,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

// Create add list button
// Listen for it
export function createAddListButton() {
  const sidebarDiv = document.querySelector('main .tabs');
  const addListIcon = createImg(
    addListIconSrc,
    'Add List Button',
    'add-list-btn'
  );
  sidebarDiv.append(addListIcon);

  // Show add list field and remove add list button when clicked
  addListIcon.addEventListener('click', () => {
    createAddListForm(addListIcon);
    removeAddListButton(addListIcon);
  });
}

// Remove add list button
function removeAddListButton(addListButton) {
  addListButton.remove();
}

// Create add list form
function createAddListForm(addListButton) {
  const addListForm = createForm('add-list-form');
  const listField = createInputText(
    'add-list-form',
    'list-name',
    3,
    16,
    'Name'
  );
  const createBtn = createButton('submit', '');
  const createBtnIcon = createImg(
    createIconScr,
    'Create List Icon',
    'create-list-icon'
  );
  createBtn.append(createBtnIcon);
  const cancelBtn = createImg(
    cancelIconScr,
    'Cancel List Icon',
    'cancel-list-icon'
  );
  addListForm.append(listField, createBtn, cancelBtn);
  addListButton.parentNode.insertBefore(addListForm, addListButton);
  listField.focus();

  // Listen for form submission
  listenForNewList(addListForm);
  // Remove form and show the add list button again if the Cancel button is clicked
  cancelBtn.addEventListener('click', () => {
    addListForm.remove();
    createAddListButton();
  });
}

// Add new list when the Create button is clicked
function listenForNewList(formElement) {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    // Capitalise the new list and add it to the lists array
    const firstChar = formElement.elements['list-name'].value
      .charAt(0)
      .toUpperCase();
    const slicedList = formElement.elements['list-name'].value.slice(1);
    const newList = firstChar + slicedList;
    Task.lists.push(newList);
    // Refresh list tabs
    removeListTabs();
    formElement.remove();
    generateListTabs();
    createAddListButton();
  });
}

// Create add task button
// Listen for it
function createAddTaskButton() {
  const contentDiv = document.querySelector('main .content');
  const addBtn = createDiv(`add-task`);
  contentDiv.append(addBtn);

  const addIcon = createImg(addTaskIconSrc, 'Add Task Button', 'add-task-btn');
  addBtn.append(addIcon);

  // Show add task form and remove add task button when clicked
  addBtn.addEventListener('click', () => {
    createAddTaskForm(addBtn);
    removeAddTaskButton(addBtn);
  });
}

// Remove add task button
function removeAddTaskButton(addTaskButton) {
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
  listenForCancelButton(cancelBtn, addTaskForm);
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
    let dueDate = new Date(formElement.elements['due-date'].value);
    // Make sure due date time is set to 23:59:59
    dueDate = setHours(dueDate, 23);
    dueDate = setMinutes(dueDate, 59);
    dueDate = setSeconds(dueDate, 59);
    // Create new Task instance and add it to the tasks array
    Task.tasks.push(new Task(title, description, list, priority, dueDate));
    // Refresh tasks
    generatePage();
  });
}

// Remove the add task form and recreate the add form button if the Cancel button is clicked
function listenForCancelButton(cancelButton, addTaskForm) {
  cancelButton.addEventListener('click', () => {
    addTaskForm.remove();
    createAddTaskButton();
  });
}

// Remove all tasks
function removeTasks() {
  const contentDiv = document.querySelector('main .content');
  const newContentDiv = createDiv('content');
  contentDiv.parentNode.append(newContentDiv);
  contentDiv.remove();
}

// Display tasks stored in the task array given as an argument
// Execute slightly differently for the Coming Up and Completed pages
function displayTasks(taskArray) {
  const contentDiv = document.querySelector('main .content');
  taskArray.forEach((task, index) => {
    if (Task.tasks.includes(task)) {
      const taskDiv = createDiv(`task-${index}`);
      taskDiv.dataset.index = index;
      // Get index from the main array
      taskDiv.dataset.ogindex = Task.tasks.indexOf(task);
      contentDiv.append(taskDiv);

      let checkbox;
      if (Task.taskArrayMethod === 'getCompletedTasks') {
        checkbox = createImg(
          checkboxCheckedSrc,
          'Checked Checkbox Icon',
          'checked-checkbox-icon'
        );
      } else {
        checkbox = createImg(checkboxSrc, 'Checkbox Icon', 'checkbox-icon');
      }
      const title = createP(task.title, 'title');
      const deleteIcon = createImg(
        deleteTaskScr,
        'Delete Task Icon',
        'delete-task-icon'
      );
      let dueDate;
      if (Task.taskArrayMethod === 'getComingUpTasks') {
        dueDate = createP(
          formatDistanceToNow(task.dueDate, { addSuffix: true }),
          'due-date'
        );
      } else {
        dueDate = createP(task.dueDate.toLocaleDateString('pl'), 'due-date');
      }
      taskDiv.append(checkbox, title, deleteIcon, dueDate);
    }
  });
}

// Generate task details
function generateTaskDetails(task, index) {
  const detailsDiv = createDiv(`details-task-${index}`);
  const clickedTask = document.querySelector(`div.task-${index}`);
  insertAfter(detailsDiv, clickedTask);

  const titleSpan = createSpan('Title');
  const descriptionSpan = createSpan('Description');
  const listSpan = createSpan('List');
  const prioritySpan = createSpan('Priority');
  const dueDateSpan = createSpan('Due Date');
  const creationDateSpan = createSpan('Created On');

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
  );
}

// Generate task details for completed tasks
function generateCompletedTaskDetails(task, index) {
  const detailsDiv = createDiv(`details-task-${index}`);
  const clickedTask = document.querySelector(`div.task-${index}`);
  insertAfter(detailsDiv, clickedTask);

  const titleSpan = createSpan('Title');
  const descriptionSpan = createSpan('Description');
  const listSpan = createSpan('List');
  const completionDateSpan = createSpan('Completed on');

  const title = createP(task.title, 'title-details');
  const description = createP(task.description, 'description-details');
  const list = createP(task.list, 'list-details');
  const completionDate = createP(
    task.completionDate.toLocaleDateString('pl'),
    'completion-date-details'
  );

  detailsDiv.append(
    titleSpan,
    title,
    descriptionSpan,
    description,
    listSpan,
    list,
    completionDateSpan,
    completionDate
  );
}

// Listen for task title click
// Show or hide task details
function listenForTitleClick(taskArray) {
  const taskTitles = document.querySelectorAll('.title');

  taskTitles.forEach((title) => {
    title.addEventListener('click', function showDetails() {
      const index = title.parentNode.dataset.index;
      const originalIndex = title.parentNode.dataset.ogindex;
      if (Task.taskArrayMethod === 'getCompletedTasks') {
        generateCompletedTaskDetails(taskArray[index], index);
      } else {
        generateTaskDetails(taskArray[index], index);
        editTask(title, originalIndex);
      }
      title.removeEventListener('click', showDetails);
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
function listenForDeleteClick() {
  const deleteIcons = document.querySelectorAll('.delete-task-icon');

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      // Delete from the original tasks array
      const originalIndex = deleteIcon.parentNode.dataset.ogindex;
      Task.tasks.splice(originalIndex, 1);
      // Refresh tasks
      generatePage();
    });
  });
}

// Listen for checkbox click
// Mark the task as completed
function listenForCheckboxClick() {
  const checkboxIcons = document.querySelectorAll('.checkbox-icon');

  checkboxIcons.forEach((checkboxIcon) => {
    checkboxIcon.addEventListener('click', () => {
      const originalIndex = checkboxIcon.parentNode.dataset.ogindex;
      Task.tasks[originalIndex].markAsCompleted();
      // Refresh tasks
      generatePage();
    });
  });
}

// Listen for checked checkbox click
// Undo marking the task as completed
function listenForCheckedCheckboxClick() {
  const checkedCheckboxIcons = document.querySelectorAll(
    '.checked-checkbox-icon'
  );

  checkedCheckboxIcons.forEach((checkedCheckboxIcon) => {
    checkedCheckboxIcon.addEventListener('click', () => {
      const originalIndex = checkedCheckboxIcon.parentNode.dataset.ogindex;
      Task.tasks[originalIndex].undoCompleted();
      // Refresh tasks
      generatePage();
    });
  });
}

// Edit task details (title, description, list, priority, due date)
function editTask(titleClicked, originalIndex) {
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
    Task.tasks[originalIndex].updateTitle(editableTitle.innerHTML);
    titleClicked.innerHTML = Task.tasks[originalIndex].title;
  });
  editableDescription.addEventListener('input', () => {
    Task.tasks[originalIndex].updateDescription(editableDescription.innerHTML);
  });
  // Update due date value and refresh page
  editableDueDate.addEventListener('change', () => {
    let newDueDate = new Date(editableDueDate.value);
    newDueDate = setHours(newDueDate, 23);
    newDueDate = setMinutes(newDueDate, 59);
    newDueDate = setSeconds(newDueDate, 59);
    Task.tasks[originalIndex].updateDueDate(newDueDate);
    generatePage();
  });
  // Update priority and refresh page
  editablePriorities.forEach((priorityInput) => {
    priorityInput.addEventListener('change', () => {
      Task.tasks[originalIndex].updatePriority(priorityInput.value);
      generatePage();
    });
  });
  // Update list and refresh page
  editableList.addEventListener('change', () => {
    Task.tasks[originalIndex].updateList(editableList.value);
    generatePage();
  });
}

// Refresh or generate a page
export function generatePage() {
  let taskArray;
  if (
    Task.taskArrayMethod === 'getActiveTasks' ||
    Task.taskArrayMethod === 'getComingUpTasks' ||
    Task.taskArrayMethod === 'getCompletedTasks'
  ) {
    taskArray = Task[Task.taskArrayMethod]();
  } else {
    taskArray = Task[Task.taskArrayMethod](
      Task[Task.taskArraySortedInto][Task.taskArraySortedIntoIndex]
    );
    console.log(
      Task.taskArrayMethod,
      Task.taskArraySortedInto,
      Task.taskArraySortedIntoIndex
    );
  }
  removeTasks();
  displayTasks(taskArray);
  listenForTitleClick(taskArray);
  createAddTaskButton();
  listenForDeleteClick();
  listenForCheckboxClick();
}

// Generate or refresh Completed page
export function generateCompletedPage() {
  const taskArray = Task[Task.taskArrayMethod]();
  removeTasks();
  displayTasks(taskArray);
  listenForTitleClick(taskArray);
  listenForDeleteClick();
  listenForCheckedCheckboxClick();
}
