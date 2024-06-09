import { Counter } from './counter.js';
import { Task } from './task.js';

export class Timer {
  #activeTask = null;

  #counter;
  #time;
  #pause;
  #bigPause;
  #tasks;

  constructor({
    time = 25 * 60,
    pause = 5 * 60,
    bigPause = 15 * 60,
    tasks = [],
  }) {
    this.#time = time;
    this.#pause = pause;
    this.#bigPause = bigPause;
    this.#tasks = tasks;
    this.#counter = new Counter();
  }

  add(task) {
    if (!(task instanceof Task)) {
      throw Error('Invalid data in task adding', task);
    }

    console.log(`Добавлена задача: ${task.getName()} (${task.getId()})`);
    this.#tasks[task.getId()] = task;
  }

  setActiveTask(taskId) {
    this.#activeTask = this.#tasks[taskId];
  }

  startTask() {
    if (!this.#activeTask) {
      throw Error('Нет активной задачи');
    }

    const taskTimeout = () => {
      console.log('Время прошло, счетчик увеличен');
      this.#counter.addCount();
      if (this.#counter.getCount() % 3 === 0) {
        this.setPause(this.#bigPause);
      } else {
        this.setPause(this.#pause);
      }
    };

    setTimeout(taskTimeout, this.#time * 1000);
  }

  setPause(seconds) {
    console.log('Установлена пауза', seconds);
  }
}
