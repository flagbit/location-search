import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export abstract class AbstractObservable {

  public subject: BehaviorSubject<any>;

  constructor() {
    this.subject = new BehaviorSubject(null);
  }

  public get(): BehaviorSubject<any> {
    return this.subject;
  }

}
