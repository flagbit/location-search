import { IController } from 'angular';

export class ApplicationController implements IController {
  $onInit() {
    console.log('INIT ApplicationController Test')
  }
}
