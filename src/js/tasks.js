class Task {
  creationDate;
  dueDate = 'Due Date Goes Here';
  completed;
  completionDate = 'Not Completed Yet';

  constructor(title, description, list, priority) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.priority = priority;
    this.completed = false;
    this.creationDate = new Date();
    this.creationDate = this.creationDate.toLocaleString('en-GB');
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }
}

const tasks = [
  new Task('Learn JS', 'Learn some JS, dumbass', 'default', 'high'),
  new Task('Learn React', 'Learn some React, dumbass', 'default', 'medium'),
  new Task(
    'Learn algorithms',
    'Learn some algorithms, dumbass',
    'default',
    'low'
  ),
];

export { Task, tasks };
