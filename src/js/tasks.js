class Task {
  dueDate = 'Due Date Goes Here';
  completionDate = 'Not Completed Yet';

  constructor(title, description, list, priority) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.priority = priority;
    this.completed = false;
    this.creationDate = new Date();
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
