import { AbstractObservable } from '../observables/abstract.observable';
import { QueryObservableInstance } from '../observables/query.observable';
import UserLocation from '../observables/user.location.observable';
import { CONFIG } from '../config/config';

export class DataService extends AbstractObservable {

  private worker: any;

  constructor(
  ) {
    super();
    this.initWorker();
    this.setWorkerConfig();
    this.setUserLocationInWorker();
    this.subscribeQuery();
  }

  public subscribeQuery() {
    QueryObservableInstance.get().subscribe(query => {
      if (query !== null) {
        console.log('QUERY CHANGED', query);
        this.filter(query);
      }
    });
  }

  public gotoPage(pageNum: number): void {
    this.worker.postMessage({
      type: 'setCurrentPage',
      payload: pageNum
    });
  }

  public filter(query): void {
    let workerMessage = {
      type: 'filter',
      payload: query
    };
    this.worker.postMessage(workerMessage);
  }

  public toggleItemActive(index: number) {
    let last = this.subject.value;
    for (let item of last.items) {
      item.active = false;
    }
    last.items[index]['active'] = !last.items[index]['active'];
    this.subject.next(last);
  }

  private messageHandler(message) {
    // console.log('+++ messageHandler', message.data);
    console.log('*** MESSAGE HANDLER', message.data[0]);
    this.subject.next(message.data);
  }

  private initWorker() {
    this.worker = new Worker('/lib/shared/data/data.worker.js');
    this.worker.onmessage = this.messageHandler.bind(this);
  }

  private setUserLocationInWorker(): void {
    UserLocation.get().subscribe((location) => {
      let workerMessage = {
        type: 'setUserLocation',
        payload: location
      };
      this.worker.postMessage(workerMessage);
    });
  }

  private setWorkerConfig(): void {
    let workerMessage = {
      type: 'setConfig',
      payload: CONFIG
    };
    this.worker.postMessage(workerMessage);
  }
}

export const DataServiceInstance = new DataService;
