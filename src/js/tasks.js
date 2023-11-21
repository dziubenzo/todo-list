export default class Task {
  creationDate;
  dueDate = 'not given yet';
  completionDate = 'not given yet';

  constructor(title, description, list, priority) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.priority = priority;
    this.creationDate = new Date();
    this.creationDate = this.creationDate.toLocaleString('en-GB');
  }
}
