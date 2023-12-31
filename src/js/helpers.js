// Create h1-6
export function createH(level, content, className = '') {
  const heading = document.createElement(`h${level}`);
  heading.innerHTML = content;
  if (className) {
    heading.classList.add(className);
  }
  return heading;
}

// Create div
export function createDiv(className = '') {
  const div = document.createElement('div');
  if (className) {
    div.classList.add(className);
  }
  return div;
}

// Create p
export function createP(content, className = '') {
  const p = document.createElement('p');
  p.innerHTML = content;
  if (className) {
    p.classList.add(className);
  }
  return p;
}

// Create img
export function createImg(src, alt, className = '') {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  if (className) {
    img.classList.add(className);
  }
  return img;
}

// Create span
export function createSpan(content, className = '') {
  const span = document.createElement('span');
  span.innerHTML = content;
  if (className) {
    span.classList.add(className);
  }
  return span;
}

// Create input of type date, with min value of today if set to true
export function createInputDate(value, name, min = false, className = '') {
  const input = document.createElement('input');
  input.type = 'date';
  input.value = formatDate(value);
  input.name = name;
  if (min) {
    const today = new Date();
    input.min = formatDate(today);
  }
  if (className) {
    input.classList.add(className);
  }
  return input;
}

// Create input of type radio
function createInputRadio(value, name, id, checked = false) {
  const input = document.createElement('input');
  input.type = 'radio';
  input.value = value;
  input.name = name;
  input.id = id;
  if (checked) {
    input.checked = true;
  }
  return input;
}

// Create label
export function createLabel(content, forName, className = '') {
  const label = document.createElement('label');
  label.innerHTML = content;
  label.htmlFor = forName;
  if (className) {
    label.classList.add(className);
  }
  return label;
}

// Create select
function createSelect(name, id, className = '') {
  const select = document.createElement('select');
  select.id = id;
  select.name = name;
  if (className) {
    select.classList.add(className);
  }
  return select;
}

// Create option
function createOption(content, selected = false) {
  const option = document.createElement('option');
  option.innerHTML = content;
  option.value = content;
  if (selected) {
    option.selected = true;
  }
  return option;
}

// Create input of type text
export function createInputText(
  id,
  name,
  minlength,
  maxlength,
  placeholder = '',
  required = false
) {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.name = name;
  input.minLength = minlength;
  input.maxLength = maxlength;
  if (placeholder) {
    input.placeholder = placeholder;
  }
  if (required) {
    input.required = true;
  }
  return input;
}

// Create textarea
export function createTextarea(
  id,
  name,
  rows,
  minlength,
  maxlength,
  placeholder,
  required = false
) {
  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.name = name;
  textarea.rows = rows;
  textarea.minLength = minlength;
  textarea.maxLength = maxlength;
  textarea.placeholder = placeholder;
  if (required) {
    textarea.required = true;
  }
  return textarea;
}

// Create form
export function createForm(id, className = '') {
  const form = document.createElement('form');
  form.id = id;
  if (className) {
    form.classList.add(className);
  }
  return form;
}

// Create button
export function createButton(type, content, form = '', className = '') {
  const button = document.createElement('button');
  button.type = type;
  button.innerHTML = content;
  if (form) {
    button.form = form;
  }
  if (className) {
    button.classList.add(className);
  }
  return button;
}

// Create a drop down list of task lists
// If task and index given as arguments, select the list of the task selected
export function createDropDownList(
  task = '',
  index = '',
  name,
  id,
  lists,
  className = ''
) {
  let select;
  if (index) {
    select = createSelect(`${name}-task-${index}`, id);
  } else {
    select = createSelect(name, id);
  }
  if (className) {
    select.classList.add(className);
  }
  for (const list of lists) {
    let option;
    if (task && list === task.list) {
      option = createOption(list, true);
    } else {
      option = createOption(list);
    }
    select.append(option);
  }
  return select;
}

// Create a group of priority radio buttons nested in a div
// If task and index given as arguments, make the radio button that is consistent with the priority of a task checked
export function createRadioButtonGroup(
  task = '',
  index = '',
  priorities,
  className = ''
) {
  const div = createDiv(className);
  const SELECTED_OPTION = 'low';
  for (const priority of priorities) {
    let input;
    let label;
    if (task && index) {
      if (priority === task.priority) {
        input = createInputRadio(
          priority,
          `priority-task-${index}`,
          `${priority}-task-${index}`,
          true
        );
      } else {
        input = createInputRadio(
          priority,
          `priority-task-${index}`,
          `${priority}-task-${index}`
        );
      }
      label = createLabel(
        priority,
        `${priority}-task-${index}`,
        `${priority}-priority-label`
      );
    } else {
      if (priority === SELECTED_OPTION) {
        input = createInputRadio(
          priority,
          'priority',
          `${priority}-priority`,
          true
        );
      } else {
        input = createInputRadio(priority, 'priority', `${priority}-priority`);
      }
      label = createLabel(priority, `${priority}-priority`);
    }
    div.append(input, label);
  }
  return div;
}

// Insert a DOM element after another element
export function insertAfter(newElement, existingElement) {
  existingElement.parentNode.insertBefore(
    newElement,
    existingElement.nextSibling
  );
}

// Format date (yyyy-mm-dd) so that it can be directly plugged into HTML
// Handle digits from 0 to 9
// Add one to the month due to them being counted from 0
export function formatDate(dateObject) {
  const year = String(dateObject.getFullYear());
  let month = String(dateObject.getMonth() + 1);
  let day = String(dateObject.getDate());
  if (month.length === 1) {
    month = `0${month}`;
  }
  if (day.length === 1) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}
