import { Task } from './tasks';
import checkboxSrc from '../assets/checkbox.svg';
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
import {
  formatDistanceToNow,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

// Create add task button
// Listen for it
function createAddTaskButton(taskArray) {
  const contentDiv = document.querySelector('main .content');
  const addBtn = createDiv(`add-task`);
  contentDiv.append(addBtn);

  const addIcon = createImg(addIconSrc, 'Add Task Button', 'add-task-btn');
  addBtn.append(addIcon);

  // Show add task form and hide add task form when clicked
  addBtn.addEventListener('click', () => {
    createAddTaskForm(addBtn, taskArray);
    removeAddTaskBtn(addBtn);
  });
}

// Remove add task button
function removeAddTaskBtn(addTaskButton) {
  addTaskButton.remove();
}

// Create and show form for adding a new task
function createAddTaskForm(addTaskButton, taskArray) {
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
  listenForNewTask(addTaskForm, taskArray);
  // Listen for Cancel button click
  listenForCancelButton(cancelBtn, addTaskForm);
}

// Add new task when the Create button is clicked
function listenForNewTask(formElement, taskArray) {
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
    const newTask = new Task(title, description, list, priority, dueDate);
    Task.tasks.push(newTask);
    // Update currently displayed array
    taskArray.push(newTask);
    // Refresh tasks
    generatePage(taskArray);
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
// Execute slightly differently for the Coming Up page
function displayTasks(taskArray, isComingUpPage = false) {
  const contentDiv = document.querySelector('main .content');
  taskArray.forEach((task, index) => {
    if (Task.tasks.includes(task)) {
      const taskDiv = createDiv(`task-${index}`);
      taskDiv.dataset.index = index;
      // Get index from the main array
      taskDiv.dataset.ogindex = Task.tasks.indexOf(task);
      contentDiv.append(taskDiv);

      const checkbox = createImg(checkboxSrc, 'Checkbox Icon', 'checkbox-icon');
      const title = createP(task.title, 'title');
      if (isComingUpPage) {
        title.classList.add('coming-up');
      }
      const deleteIcon = createImg(
        deleteTaskScr,
        'Delete Task Icon',
        'delete-task-icon'
      );
      let dueDate;
      if (isComingUpPage) {
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
function listenForTitleClick(taskArray) {
  const taskTitles = document.querySelectorAll('.title');

  taskTitles.forEach((title) => {
    title.addEventListener('click', function showDetails() {
      const index = title.parentNode.dataset.index;
      const originalIndex = title.parentNode.dataset.ogindex;
      generateTaskDetails(taskArray[index], index);
      title.removeEventListener('click', showDetails);
      editTask(title, originalIndex);
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
function listenForDeleteClick(taskArray) {
  const deleteIcons = document.querySelectorAll('.delete-task-icon');

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      // Delete from the original tasks array
      const originalIndex = deleteIcon.parentNode.dataset.ogindex;
      Task.tasks.splice(originalIndex, 1);
      // Refresh tasks
      generatePage(taskArray);
    });
  });
}

// Listen for checkbox click
// Mark the task as completed
function listenForCheckboxClick(taskArray) {
  const checkboxIcons = document.querySelectorAll('.checkbox-icon');

  checkboxIcons.forEach((checkboxIcon) => {
    checkboxIcon.addEventListener('click', () => {
      const originalIndex = checkboxIcon.parentNode.dataset.ogindex;
      Task.tasks[originalIndex].markAsCompleted();
      // Remove completed task from the currently displayed array
      const index = checkboxIcon.parentNode.dataset.index;
      taskArray.splice(index, 1);
      // Refresh tasks
      generatePage(taskArray);
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
  // Update due date value dynamically
  editableDueDate.addEventListener('change', () => {
    Task.tasks[originalIndex].updateDueDate(new Date(editableDueDate.value));
    titleClicked.parentNode.querySelector('p.due-date').innerHTML =
      Task.tasks[originalIndex].dueDate.toLocaleDateString('pl');
  });
  // Update priority
  editablePriorities.forEach((priorityInput) => {
    priorityInput.addEventListener('change', () => {
      Task.tasks[originalIndex].updatePriority(priorityInput.value);
    });
  });
  // Update list
  editableList.addEventListener('change', () => {
    Task.tasks[originalIndex].updateList(editableList.value);
  });
}

// Refresh or generate a page
export function generatePage(taskArray) {
  // Sort currently displayed array
  Task.sort(taskArray);
  removeTasks();
  displayTasks(taskArray);
  listenForTitleClick(taskArray);
  createAddTaskButton(taskArray);
  listenForDeleteClick(taskArray);
  listenForCheckboxClick(taskArray);
}

// Generate Coming Up page
export function generateComingUpPage(taskArray) {
  removeTasks();
  displayTasks(taskArray, true);
  // listenForTitleClick(taskArray);
  listenForDeleteClick(taskArray);
  listenForCheckboxClick(taskArray);
}
