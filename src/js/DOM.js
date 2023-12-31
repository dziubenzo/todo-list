import {
  Task,
  MAX_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  updateTasksInLocalStorage,
  updateListsInLocalStorage,
} from './tasks';
import { generateListTabs, removeListTabs, toggleSelectedTab } from './sidebar';
import checkboxSrc from '../assets/checkbox.svg';
import checkboxCheckedSrc from '../assets/checkbox-checked.svg';
import addTaskIconSrc from '../assets/add-task.svg';
import addListIconSrc from '../assets/add-list.svg';
import createIconScr from '../assets/confirm-list.svg';
import cancelIconScr from '../assets/cancel-list.svg';
import deleteTaskScr from '../assets/delete-task.svg';
import noTasksIconScr from '../assets/no-tasks-icon.svg';
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
import hamburgerMenuIconSrc from '../assets/hamburger-menu.svg';
import gitHubLogoWhiteSrc from '../assets/github-mark-white.svg';
import themeSwitchSrc from '../assets/light-dark-theme.svg';

// Load icons
export function loadIcons() {
  const hamburgerMenuBtn = document.querySelector('.hamburger-menu-btn');
  const hamburgerMenuIcon = createImg(
    hamburgerMenuIconSrc,
    'Hamburger Menu Icon'
  );
  hamburgerMenuBtn.append(hamburgerMenuIcon);
  const gitHubLink = document.querySelector('footer a');
  const gitHubLogo = createImg(gitHubLogoWhiteSrc, 'GitHub Logo');
  gitHubLink.append(gitHubLogo);
  const header = document.querySelector('header');
  const themeSwitch = createImg(
    themeSwitchSrc,
    'Light/Dark Mode Toggle',
    'colour-theme-switch-icon'
  );
  header.append(themeSwitch);
}

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
    10,
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

// Add a new list when the Create button is clicked
function listenForNewList(formElement) {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    // Trim white spaces from and capitalise the new list
    // Add it to the lists array
    const trimmedList = formElement.elements['list-name'].value.trim();
    const firstChar = trimmedList.charAt(0).toUpperCase();
    const slicedList = trimmedList.slice(1);
    const newList = firstChar + slicedList;
    Task.addList(newList);
    // Update localStorage
    updateListsInLocalStorage();
    // Refresh list tabs
    removeListTabs();
    formElement.remove();
    generateListTabs();
    createAddListButton();
    // Open All Tasks tab by default and add selected class to it
    openAllTasksTab();
    // Reapply content div blur and listen for clicking it
    listenForContentDivClick();
    applyBlurToContentDiv();
  });
}

// Delete a user-created list if the corresponding Delete icon is clicked
export function listenForDeleteListClick() {
  const deleteListIcons = document.querySelectorAll('.delete-list-icon');

  deleteListIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      // Delete from the lists array
      const listName = deleteIcon.parentNode.querySelector('p').textContent;
      Task.deleteList(listName);
      // Update localStorage
      updateListsInLocalStorage();
      // Delete from the DOM
      deleteIcon.parentNode.remove();
      // Open All Tasks tab by default and add selected class to it
      openAllTasksTab();
      // Reapply content div blur and listen for clicking it
      listenForContentDivClick();
      applyBlurToContentDiv();
    });
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
    // Remove no-tasks content if it exists
    if (document.querySelector('.no-tasks')) {
      document.querySelector('.no-tasks').remove();
    }
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
    MAX_TITLE_LENGTH,
    'Title (3 to 48 characters)',
    true
  );
  const descriptionInput = createTextarea(
    'description',
    'description',
    5,
    3,
    MAX_DESCRIPTION_LENGTH,
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
  listenForCancelButton(cancelBtn);
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
    // Update localStorage
    Task.tasks.push(new Task(title, description, list, priority, dueDate));
    updateTasksInLocalStorage();
    // Refresh tasks
    generatePage();
  });
}

// Refresh the page when the Cancel button is clicked
function listenForCancelButton(cancelButton) {
  cancelButton.addEventListener('click', () => {
    generatePage();
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
  // Add some content for empty tabs and return
  if (taskArray.length === 0) {
    addContentToEmptyTabs(contentDiv);
    return;
  }
  taskArray.forEach((task, index) => {
    if (Task.tasks.includes(task)) {
      const taskDiv = createDiv(`task-${index}`);
      taskDiv.dataset.index = index;
      // Get index from the main array
      taskDiv.dataset.ogindex = Task.tasks.indexOf(task);
      // Add appropriate priority indicator to tasks
      if (Task.taskArrayMethod === 'getCompletedTasks') {
        taskDiv.classList.add('priority-completed');
      } else {
        taskDiv.classList.add(`priority-${task.priority}`);
      }
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
  const taskTitles = document.querySelectorAll('.content .title');

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
      // Update localStorage
      const originalIndex = deleteIcon.parentNode.dataset.ogindex;
      Task.tasks.splice(originalIndex, 1);
      updateTasksInLocalStorage();
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
      // Update localStorage
      updateTasksInLocalStorage();
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
      // Update localStorage
      updateTasksInLocalStorage();
      // Refresh completed tasks
      generateCompletedPage();
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
  // Make sure it cannot exceed the limit
  editableTitle.addEventListener('input', () => {
    if (editableTitle.textContent.length > MAX_TITLE_LENGTH) {
      editableTitle.contentEditable = 'false';
      editableTitle.textContent = editableTitle.textContent.substr(
        0,
        MAX_TITLE_LENGTH
      );
      editableTitle.contentEditable = 'true';
    } else {
      Task.tasks[originalIndex].updateTitle(editableTitle.textContent);
      titleClicked.innerHTML = Task.tasks[originalIndex].title;
    }
    // Update localStorage
    updateTasksInLocalStorage();
  });
  // Update task description value dynamically
  // Make sure it cannot exceed the limit
  editableDescription.addEventListener('input', () => {
    if (editableDescription.textContent.length > MAX_DESCRIPTION_LENGTH) {
      editableDescription.contentEditable = 'false';
      editableDescription.textContent = editableDescription.textContent.substr(
        0,
        MAX_DESCRIPTION_LENGTH
      );
      editableDescription.contentEditable = 'true';
    } else {
      Task.tasks[originalIndex].updateDescription(
        editableDescription.textContent
      );
    }
    // Update localStorage
    updateTasksInLocalStorage();
  });
  // Update due date value
  editableDueDate.addEventListener('change', () => {
    let newDueDate = new Date(editableDueDate.value);
    newDueDate = setHours(newDueDate, 23);
    newDueDate = setMinutes(newDueDate, 59);
    newDueDate = setSeconds(newDueDate, 59);
    Task.tasks[originalIndex].updateDueDate(newDueDate);
    // Update localStorage
    updateTasksInLocalStorage();
    // Refresh page
    generatePage();
  });
  // Update priority
  editablePriorities.forEach((priorityInput) => {
    priorityInput.addEventListener('change', () => {
      Task.tasks[originalIndex].updatePriority(priorityInput.value);
      // Update localStorage
      updateTasksInLocalStorage();
      // Refresh page
      generatePage();
    });
  });
  // Update list
  editableList.addEventListener('change', () => {
    Task.tasks[originalIndex].updateList(editableList.value);
    // Update localStorage
    updateTasksInLocalStorage();
    // Refresh page
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
  }
  removeTasks();
  displayTasks(taskArray);
  listenForTitleClick(taskArray);
  createAddTaskButton();
  listenForDeleteClick();
  listenForCheckboxClick();
  handleSidebar();
}

// Generate or refresh Completed page
export function generateCompletedPage() {
  const taskArray = Task[Task.taskArrayMethod]();
  removeTasks();
  displayTasks(taskArray);
  listenForTitleClick(taskArray);
  listenForDeleteClick();
  listenForCheckedCheckboxClick();
  handleSidebar();
}

// Open All Tasks tab by default and add selected class to it
function openAllTasksTab() {
  const allTasksDiv = document.querySelector('.tabs .all-tasks');
  toggleSelectedTab(allTasksDiv);
  Task.taskArrayMethod = 'getActiveTasks';
  generatePage(Task.taskArrayMethod);
}

// Add content to tabs with no tasks
function addContentToEmptyTabs(contentDiv) {
  const noTasksDiv = createDiv('no-tasks');
  const noTasksHeading = createH(2, 'No tasks to display.', 'heading-no-tasks');
  const noTasksIcon = createImg(
    noTasksIconScr,
    'No Tasks Icon',
    'no-tasks-icon'
  );
  noTasksDiv.append(noTasksHeading, noTasksIcon);
  contentDiv.append(noTasksDiv);
}

// Toggle light/dark mode when the icon is clicked
export function toggleColourTheme() {
  const themeSwitch = document.querySelector('.colour-theme-switch-icon');
  themeSwitch.addEventListener('click', () => {
    const html = document.querySelector('html');
    if (html.dataset.theme === 'light') {
      html.dataset.theme = 'dark';
    } else {
      html.dataset.theme = 'light';
    }
    // Save the current setting in localStorage
    localStorage.setItem('theme', html.dataset.theme);
  });
}

// Retrieve user colour theme from localStorage if set
// Set the page to use it
export function getColourThemeFromLocalStorage() {
  const html = document.querySelector('html');
  if (localStorage.getItem('theme')) {
    html.dataset.theme = localStorage.getItem('theme');
  }
}

//
// Functions for small-width devices
//

// Show or hide sidebar on smaller-width devices when the hamburger menu button is clicked
export function showOrHideSidebar() {
  const hamburgerMenuBtn = document.querySelector('.hamburger-menu-btn');
  hamburgerMenuBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    if (sidebar.style.display === 'block') {
      sidebar.style.display = 'none';
      content.removeAttribute('style');
    } else {
      sidebar.style.display = 'block';
      content.style.filter = 'blur(2px)';
    }
  });
}

// Hide sidebar
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar.style.display === 'block') {
    sidebar.style.display = 'none';
  }
}

// Hide sidebar when the content div is clicked
export function listenForContentDivClick() {
  const content = document.querySelector('.content');
  content.addEventListener('click', () => {
    hideSidebar();
    content.removeAttribute('style');
  });
}

// Run the two functions above in parallel
export function handleSidebar() {
  hideSidebar();
  listenForContentDivClick();
}

// Apply blur to the content div when the sidebar is open
function applyBlurToContentDiv() {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');
  if (sidebar.style.display === 'block') {
    content.style.filter = 'blur(2px)';
  }
}
