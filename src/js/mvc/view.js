import { prepareTimeString } from '../helper.js';
import { Task, getTaskModelByImportance } from '../modules/task.js';
import { Timer } from '../modules/timer.js';
import { ControllerTomato } from '../mvc/controller.js';

export class RenderTomato {
  /** @type {HTMLElement} */
  #root;

  /** @type {Timer} */
  #timer;

  /** @type {ControllerTomato} */
  #controller;

  /** @type {HTMLButtonElement} */
  #startButton;

  /** @type {HTMLButtonElement} */
  #stopButton;

  /** @type {HTMLFormElement} */
  #taskForm;

  /** @type {HTMLElement} */
  #importanceButton;

  /** @type {HTMLElement} */
  #importanceInput;

  /** @type {HTMLElement} */
  #taskList;

  /**
   * @param {HTMLElement} root
   * @param {ControllerTomato} controller
   */
  constructor(root, controller) {
    this.#root = root;
    this.#controller = controller;

    this.#timer = new Timer(root.querySelector('#tomato-timer'));

    this.#taskList = root.querySelector('.tasks__list');

    this.#importanceButton = root.querySelector('.button-importance');
    this.#importanceInput = root.querySelector('#task-importance');

    this.#startButton = root.querySelector('#btn-start');
    this.#stopButton = root.querySelector('#btn-stop');
    this.#taskForm = root.querySelector('.task-form');
    this.bindListeners();
  }

  handleTaskFormSubmit(e) {
    e.preventDefault();

    const [text, importance] = [
      this.#taskForm['task-name'].value,
      this.#taskForm['task-importance'].value,
    ];

    const TaskConstructor = getTaskModelByImportance(importance);
    const task = new TaskConstructor(text);

    this.#controller.addTask(task);
    this.updateTasks();
  }

  updateTasks() {
    this.#taskList.textContent = '';

    // let timeCounter = 0;

    const activeTaskId = this.#controller.getActiveTask()?.getId();

    /**
     * @param {Task} task
     * @return {HTMLElement}
     */
    const renderTask = (task) => {
      const el = document.createElement('li');
      el.classList.add('tasks__item', task.getImportance());

      const countEl = document.createElement('span');
      countEl.classList.add('count-number');
      countEl.textContent = task.getCount();
      el.append(countEl);

      const activateButton = document.createElement('button');
      activateButton.dataset.taskId = task.getId();
      activateButton.classList.add('tasks__text');
      if (task.getId() === activeTaskId) {
        activateButton.classList.add('tasks__text_active');
      }
      activateButton.textContent = task.getText();
      el.append(activateButton);

      const controlButton = document.createElement('button');
      controlButton.classList.add('tasks__button');
      el.append(controlButton);

      // Затраченное время ?
      // timeCounter += 25 * 60 * task.getCount();
      // const timeEl = document.querySelector('.tasks__deadline');
      // timeEl.textContent = prepareTimeString(timeCounter);

      return el;
    };

    const tasks = this.#controller.getTasks();
    tasks.forEach((task) => {
      this.#taskList.append(renderTask(task));
    });
  }

  handleActiveTaskChange(e) {
    if (
      e.target.classList.contains('tasks__text') &&
      !e.target.classList.contains('tasks__text_active')
    ) {
      this.#controller.setActiveTask(e.target.dataset.taskId);
      this.#timer.setTimer(25 * 60);
      this.updateTasks();
    }
  }

  handleTimerStart() {
    this.#startButton.classList.add('hidden');
    this.#stopButton.classList.remove('hidden');
    this.#timer.startTimer();
  }

  handleTimerStop() {
    this.#startButton.classList.remove('hidden');
    this.#stopButton.classList.add('hidden');
    this.#timer.stopTimer();
  }

  handleImportanceChange() {
    let count = 0;
    const imp = ['standard', 'important', 'minor'];

    return () => {
      count += 1;
      if (count >= imp.length) {
        count = 0;
      }

      for (let i = 0; i < imp.length; i += 1) {
        if (count === i) {
          this.#importanceButton.classList.add(imp[i]);
          this.#importanceInput.value = imp[i];
        } else {
          this.#importanceButton.classList.remove(imp[i]);
        }
      }
    };
  }

  bindListeners() {
    this.#taskList.addEventListener('click', (e) =>
      this.handleActiveTaskChange(e)
    );

    this.#importanceButton.addEventListener(
      'click',
      this.handleImportanceChange().bind(this)
    );

    this.#taskForm.addEventListener(
      'submit',
      this.handleTaskFormSubmit.bind(this)
    );

    this.#startButton.addEventListener(
      'click',
      this.handleTimerStart.bind(this)
    );

    this.#stopButton.addEventListener('click', this.handleTimerStop.bind(this));
  }

  render() {
    this.updateTasks();
  }
}
