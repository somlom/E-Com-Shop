class Task {
  constructor(name, description, finished, dueDate) {
    this.name = name;
    this.description = description;
    this.finished = finished;
    this.dueDate = dueDate;
  }
}

class TaskBuilder {
  constructor(name, description, dueDate, isFinished) {
    this.name = name;
    this.description = description;
    this.isFinished = isFinished || false;
    this.dueDate = dueDate;
  }
  setName(name) {
    this.name = name;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }
  setFinished(finished) {
    this.finished = finished;
    return this;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
    return this;
  }
  build() {
    return new Task(this.name, this.description, false, this.dueDate);
  }
}

const task = new TaskBuilder()
  .setName('Task A')
  .setDescription('finish book')
  .setDueDate(new Date(2019, 5, 12));
// .build()
console.log(task);

const task1 = new TaskBuilder(
  'Task B',
  'start book',
  new Date(2019, 5, 12)
).build();

console.log(task1);
