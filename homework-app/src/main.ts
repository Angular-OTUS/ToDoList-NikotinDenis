import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TodoList } from './app/components/todo-list/todo-list';

bootstrapApplication(TodoList, appConfig)
  .catch((err) => console.error(err));
