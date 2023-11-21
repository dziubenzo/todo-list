import '../css/main.scss';
import Task from './tasks';

const tasks = [];

const item1 = new Task(
  'Learn JS',
  'Learn some JS, dumbass!!!',
  'default',
  'high'
);
const item2 = new Task(
  'Learn React',
  'Learn some React, dumbass',
  'default',
  'medium'
);
const item3 = new Task(
  'Learn algorithms',
  'Learn some algorithms, dumbass',
  'default',
  'low'
);

tasks.push(item1, item2, item3);

console.table(tasks);
