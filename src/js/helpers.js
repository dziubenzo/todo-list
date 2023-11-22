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

// Insert a DOM element after another element
export function insertAfter(newElement, existingElement) {
  existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling);
}

