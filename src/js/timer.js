import { Counter } from './counter.js';
import { Task } from './task.js';

export class Timer {
  static #instance = null;

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
    if (Timer.#instance) {
      throw new Error('Timer is a singleton class. Use Timer.getInstance().');
    }

    this.#time = time;
    this.#pause = pause;
    this.#bigPause = bigPause;
    this.#tasks = tasks;
    this.#counter = new Counter();
  }

  /**
   * @param {object} config
   * @return {Timer}
   */
  static getInstance(config = {}) {
    if (!Timer.#instance) {
      Timer.#instance = new Timer(config);
    }
    return Timer.#instance;
  }

  add(task) {
    if (!(task instanceof Task)) {
      throw Error('Invalid data in task adding', task);
    }

    console.log(`Добавлена задача: ${task.getText()} (${task.getId()})`);
    this.#tasks[task.getId()] = task;
    return this;
  }

  setActiveTask(taskId) {
    this.#activeTask = this.#tasks[taskId];
    return this;
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
    return this;
  }

  setPause(seconds) {
    console.log('Установлена пауза', seconds);
    return this;
  }
}
