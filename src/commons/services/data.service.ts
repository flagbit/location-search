import { AbstractObservable } from '../observables/abstract.observable';
import { QueryObservableInstance } from '../observables/query.observable';
import UserLocation from '../observables/user.location.observable';
import { CONFIG, WORKER_PATH } from '../config/config';

export class DataService extends AbstractObservable {

  private worker: any;

  constructor() {
    super();
  }

  /**
   * Start the service. This is the main entrypoint for the component.
   * Needs to get called by the different framework implementations!
   */
  public start(): void {
    this.initWorker();
    this.setWorkerConfig();
    this.subscribeUserLocation();
    this.subscribeQuery();
  }

  /**
   * Subscribe to the QueryObservable and pass changes to this.filter()
   */
  public subscribeQuery(): void {
    QueryObservableInstance.get().subscribe(query => {
      if (query !== null) {
        this.filter(query);
      }
    });
  }

  /**
   * Subscribe to the UserLocationObservable
   */
  public subscribeUserLocation(): void {
    UserLocation.get().subscribe((location) => {
      this.setUserLocationInWorker(location);
    });
  }

  /**
   * Toggle active state of an item in the current list
   *
   * @param index position in current list of the item to set active
   */
  public toggleItemActive(index: number): void {
    let last = this.subject.value;
    for (let item of last.items) {
      item.active = false;
    }
    last.items[index]['active'] = !last.items[index]['active'];
    this.subject.next(last);
  }

  //
  // Webworker Communication starts here
  // ===========================================================================

  private initWorker() {
    this.worker = new Worker(`${WORKER_PATH}/data.worker.js`);
    this.worker.onmessage = this.messageHandler.bind(this);
  }

  private messageHandler(message) {
    this.subject.next(message.data);
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

  public setUserLocationInWorker(location: any): void {
    let workerMessage = {
      type: 'setUserLocation',
      payload: location
    };
    this.worker.postMessage(workerMessage);
  }

  public setWorkerConfig(): void {
    let workerMessage = {
      type: 'setConfig',
      payload: CONFIG
    };
    this.worker.postMessage(workerMessage);
  }
}

export const DataServiceInstance = new DataService;
