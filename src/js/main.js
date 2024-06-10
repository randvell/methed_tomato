import './importance.js';
import './counter.js';
import { Timer } from './timer.js';
import { ImportantTask, StandardTask } from './task.js';

const timer = Timer.getInstance({ time: 2 });
const taskStandard = new StandardTask('Test task');
const taskImportant = new ImportantTask('Very important');

timer.add(taskStandard).add(taskImportant);
timer.setActiveTask(taskImportant.getId());

// Специально пока оставил возможность запуска несколько раз,
// чтобы показать увеличение паузы
timer.startTask();
timer.startTask();
timer.startTask();
