class Task {
  static tasks = [
    new Task(
      'Learn JS',
      'Learn some JS, dumbass',
      'Personal',
      'high',
      new Date(2023, 10, 26)
    ),
    new Task(
      'Learn React',
      'Learn some React, dumbass',
      'Work',
      'medium',
      new Date(2023, 10, 28)
    ),

    new Task(
      'Learn algorithms',
      'Learn some algorithms, dumbass',
      'Travel',
      'low',
      new Date(2023, 11, 5)
    ),
  ];
  static priorities = ['low', 'medium', 'high', 'yesterday'];
  static lists = ['Personal', 'Work', 'Travel'];

  static getActiveTasks() {
    return Task.tasks.filter((task) => task.completed === false);
  }

  static getTasksByList(list) {
    return Task.getActiveTasks().filter((task) => task.list === list);
  }

  static getTasksByPriority(priority) {
    return Task.getActiveTasks().filter((task) => task.priority === priority);
  }

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

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateList(newList) {
    this.list = newList;
  }

  markAsCompleted() {
    this.completed = true;
    this.completionDate = new Date();
  }
}

export { Task };
