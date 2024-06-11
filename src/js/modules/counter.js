export class Counter {
  #increment = 0;
  #value;
  #name;
  #id;

  constructor(name, value = 0) {
    this.#id = this.#increment++;
    this.#name = name;
    this.#value = value;
  }

  addCount() {
    this.#value += 1;
  }

  getCount() {
    return this.#value;
  }

  setName(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

// const counter = new Counter('one');
// console.log('One:', counter.getCount());
// counter.addCount();
// console.log('++One:', counter.getCount());
// counter.setName('two');
// console.log('Now it is not one, but:', counter.getName());
