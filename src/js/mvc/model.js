import { Counter } from '../modules/counter.js';
import { Task } from '../modules/task.js';

export class ModelTomato {
  static #instance = null;
  static #canInitialize = false;

  #activeTask = null;
  #counter;
  #time;
  #pause;
  #bigPause;
  #tasks;

  constructor({ time, pause, bigPause, tasks }) {
    if (!ModelTomato.#canInitialize) {
      throw new Error(
        'ModelTomato is a singleton class. Use ModelTomato.getInstance().'
      );
    }

    this.#time = time;
    this.#pause = pause;
    this.#bigPause = bigPause;
    this.#tasks = tasks;
    this.#counter = new Counter();
  }

  /**
   * @param {object} config
   * @return {ModelTomato}
   */
  static getInstance(config = {}) {
    if (!ModelTomato.#instance) {
      const defaultConfig = {
        time: 25 * 60,
        pause: 5 * 60,
        bigPause: 15 * 60,
        tasks: [],
      };

      const finalConfig = { ...defaultConfig, ...config };
      ModelTomato.#canInitialize = true;
      ModelTomato.#instance = new ModelTomato(finalConfig);
      ModelTomato.#canInitialize = false;
    }

    return ModelTomato.#instance;
  }

  getTasks() {
    return this.#tasks;
  }

  getActiveTask() {
    return this.#activeTask;
  }

  addTask(task) {
    if (!task instanceof Task) {
      throw Error('Invalid data in task adding', task);
    }

    console.log(`Добавлена задача: ${task.getText()} (${task.getId()})`);
    this.#tasks.push(task);

    return this;
  }

  setActiveTask(taskId) {
    for (let i = 0; i < this.#tasks.length; i++) {
      const currentTaskId = this.#tasks[i].getId();
      if (currentTaskId === taskId) {
        this.#activeTask = this.#tasks[i];
        return this;
      }
    }

    throw Error('Передан некорректный ID задачи: "' + taskId + '"');
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
