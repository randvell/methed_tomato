import { generateRandomID } from './helper.js';

export class Task {
  #name;
  #id;

  constructor(name) {
    this.#name = name;
    this.#id = generateRandomID(8);
  }

  getId() {
    return this.#id;
  }

  setName(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}
