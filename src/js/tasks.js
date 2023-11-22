class Task {
  creationDate;
  dueDate;
  completed;
  completionDate;

  constructor(title, description, list, priority) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.priority = priority;
    this.completed = false;
    this.creationDate = new Date();
    this.creationDate = this.creationDate.toLocaleString('en-GB');
  }
}

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

export { Task, tasks };
