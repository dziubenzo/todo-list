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
export function createInputDate(value, min = false, className = '') {
  const input = document.createElement('input');
  input.type = 'date';
  input.value = formatDate(value);
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
function createLabel(content, forName, className = '') {
  const label = document.createElement('label');
  label.innerHTML = content;
  label.htmlFor = forName;
  if (className) {
    label.classList.add(className);
  }
  return label;
}

// Create select
function createSelect(name) {
  const select = document.createElement('select');
  select.name = name;
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

// Create a drop down list of lists
// Make the list that is consistent with the list of a task selected
export function createDropDownList(task, index, name, lists) {
  const select = createSelect(`${name}-task-${index}`);
  for (const list of lists) {
    let option;
    if (list === task.list) {
      option = createOption(list, true);
    } else {
      option = createOption(list);
    }
    select.append(option);
  }
  return select;
}

// Create a group of priority radio buttons for a task and append them to parentElement
// Make the radio button that is consistent with the priority of a task checked
export function createRadioButtonGroup(task, index, priorities, parentElement) {
  for (const priority of priorities) {
    let input;
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
    const label = createLabel(
      priority,
      `${priority}-task-${index}`,
      `${priority}-priority-label`
    );
    parentElement.append(input, label);
  }
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
