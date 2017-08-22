import { IController } from 'angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataServiceInstance } from '../shared/data/data.service';

export class LocationSearchController implements IController {

  public listSubject: BehaviorSubject<any> = DataServiceInstance.get();

  constructor() {
    this.subscribeList();
  }

  private subscribeList() {
    this.listSubject.subscribe(list => {
      // console.log('LIST #1', list);
    });
  }

}
