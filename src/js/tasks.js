export default class Task {
  creationDate;
  dueDate
  completed;
  completionDate

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
