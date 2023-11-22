class Task {
  completionDate;

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
}

const tasks = [
  new Task(
    'Learn JS',
    'Learn some JS, dumbass',
    'default',
    'high',
    new Date('2023, 11, 26')
  ),
  new Task(
    'Learn React',
    'Learn some React, dumbass',
    'default',
    'medium',
    new Date('2023, 11, 28')
  ),

  new Task(
    'Learn algorithms',
    'Learn some algorithms, dumbass',
    'default',
    'low',
    new Date('2023, 12, 02')
  ),
];

export { Task, tasks };
