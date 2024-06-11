import { RenderTomato } from './mvc/view.js';
import { ModelTomato } from './mvc/model.js';
import { ControllerTomato } from './mvc/controller.js';

const model = ModelTomato.getInstance();
const controller = ControllerTomato.getInstance(model);
const view = new RenderTomato(document.querySelector('.main'), controller);
view.render();
