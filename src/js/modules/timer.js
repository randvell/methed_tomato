export class Timer {
  #timerContainer;
  #timerInterval;
  #timeRemaining = 0;
  #callback;

  constructor(timerContainer, callback) {
    this.#timerContainer = timerContainer;
    this.#callback = callback;
  }

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  updateTimerDisplay(seconds) {
    this.#timerContainer.textContent = this.formatTime(seconds);
  }

  startTimer() {
    if (!this.#timeRemaining) {
      throw Error('Необходимо завести таймер!');
    }

    this.#timerInterval = setInterval(() => {
      this.#timeRemaining -= 1;
      this.updateTimerDisplay(this.#timeRemaining);

      if (this.#timeRemaining <= 0) {
        clearInterval(this.#timerInterval);
        this.onTimerFinish();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.#timerInterval);
  }

  setTimer(seconds) {
    this.#timeRemaining = seconds;
    this.updateTimerDisplay(this.#timeRemaining);
  }

  onTimerFinish() {
    if (this.#callback) {
      this.#callback();
    }
  }
}
