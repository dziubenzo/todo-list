import '../css/main.scss';
import { tasks } from './tasks';
import { displayAllTasks, showTaskDetails } from './DOM';

displayAllTasks();

const taskTitles = document.querySelectorAll('.title');

taskTitles.forEach((title) => {
  title.addEventListener('click', function showDetails(event) {
    const index = event.target.parentNode.classList.value.substr(-1, 1);
    showTaskDetails(tasks[index], index);
    title.removeEventListener('click', showDetails);
    title.addEventListener('click', function hideDetails(event) {
      event.target.parentNode.nextSibling.remove();
      title.removeEventListener('click', hideDetails);
      title.addEventListener('click', showDetails);
    })
  })
})