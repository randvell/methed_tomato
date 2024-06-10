import {
  TASK_TYPE_IMPORTANT,
  TASK_TYPE_MINOR,
  TASK_TYPE_STANDARD,
} from './const.js';
import { generateRandomID } from './helper.js';

export class Task {
  #importance;
  #count = 0;
  #text;
  #id;

  constructor(text, importance = TASK_TYPE_STANDARD) {
    if (new.target === Task) {
      throw new Error('Cannot instantiate abstract class Task directly');
    }

    this.#text = text;
    this.#importance = importance;
    this.#id = generateRandomID(8);
  }

  getId() {
    return this.#id;
  }

  setText(text) {
    this.#text = text;
  }

  getText() {
    return this.#text;
  }

  getImportance() {
    return this.#importance;
  }

  getCount() {
    return this.#count;
  }

  addCount() {
    this.#count++;
  }
}

export class ImportantTask extends Task {
  constructor(text) {
    super(text, TASK_TYPE_IMPORTANT);
  }
}

export class StandardTask extends Task {
  constructor(text) {
    super(text, TASK_TYPE_STANDARD);
  }
}

export class MinorTask extends Task {
  constructor(text) {
    super(text, TASK_TYPE_MINOR);
  }
}
