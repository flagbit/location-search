import { IController } from 'angular';
import { DataServiceInstance } from '../../commons/services/data.service';

export class ListController implements IController {
  public subject: any;
  public locations: Array<any> = [];

  constructor(
    private $timeout
  ) {}

  public toggleItemActive(index: number): void {
    DataServiceInstance.toggleItemActive(index);
  }

  public subscribeSubject() {
    this.subject.subscribe(data => {
      // console.log('+++ subscribeSubject', data);
      if (data !== null) {
        this.$timeout(() => {
          this.locations = data.items;
        });
      }
    });
  }

  $onInit() {
    console.log('+++ BL')
    this.subscribeSubject();
  }
}
