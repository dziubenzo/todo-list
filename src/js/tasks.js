class Task {
  static priorities = ['low', 'medium', 'high', 'yesterday'];

  completionDate = 'Implement me pls';

  constructor(title, description, list, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.priority = priority;
    this.completed = false;
    this.creationDate = new Date();
    this.dueDate = dueDate;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateDescription(newDescription) {
    this.description = newDescription;
  }

  updateDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
}

const tasks = [
  new Task(
    'Learn JS',
    'Learn some JS, dumbass',
    'default',
    'high',
    new Date(2023, 10, 26)
  ),
  new Task(
    'Learn React',
    'Learn some React, dumbass',
    'default',
    'medium',
    new Date(2023, 10, 28)
  ),

  new Task(
    'Learn algorithms',
    'Learn some algorithms, dumbass',
    'default',
    'low',
    new Date(2023, 11, 5)
  ),
];

export { Task, tasks };
