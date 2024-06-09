import './importance.js';
import './counter.js';
import { Timer } from './timer.js';
import { Task } from './task.js';

const timer = new Timer({ time: 2 });
const task = new Task('Test task');

timer.add(task);
timer.setActiveTask(task.getId());

// Специально пока оставил возможность запуска несколько раз,
// чтобы показать увеличение паузы
timer.startTask();
timer.startTask();
timer.startTask();
