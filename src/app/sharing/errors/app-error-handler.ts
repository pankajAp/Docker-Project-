import {ErrorHandler} from '@angular/core';
import {MessageService} from 'primeng/api';

export class AppErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error) {
    console.error(error);
  }
}
