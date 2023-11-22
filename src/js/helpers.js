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
export function createInputDate(value, min = false, classList = '') {
  const input = document.createElement('input');
  input.type = 'date';
  input.value = formatDate(value);
  if (min) {
    const today = new Date();
    input.min = formatDate(today);
  }
  if (classList) {
    input.classList.add(className);
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
export function formatDate(dateObject) {
  return `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1
  }-${dateObject.getDate()}`;
}
