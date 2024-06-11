import { Task } from '../modules/task.js';
import { ModelTomato } from './model.js';

/**
 * @class
 */
export class ControllerTomato {
  static #instance = null;

  /** @type {ModelTomato} */
  #model;

  constructor(model) {
    if (ControllerTomato.#instance) {
      throw new Error('Timer is a singleton class. Use Timer.getInstance().');
    }

    this.#model = model;
  }

  /**
   * @param {object} config
   * @return {ControllerTomato}
   */
  static getInstance(config = {}) {
    if (!ControllerTomato.#instance) {
      ControllerTomato.#instance = new ControllerTomato(config);
    }

    return ControllerTomato.#instance;
  }

  addTask(task) {
    if (!task instanceof Task) {
      throw Error('Invalid data in task adding', task);
    }

    this.#model.addTask(task);
  }

  setActiveTask(taskId) {
    this.#model.setActiveTask(taskId);
  }

  getTasks() {
    return this.#model.getTasks();
  }

  /**
   * @return {Task|null}
   */
  getActiveTask() {
    return this.#model.getActiveTask();
  }

  addTaskCount() {
    this.getActiveTask()?.addCount();
  }

  getTaskTime() {
    return this.#model.getTime();
  }
}
