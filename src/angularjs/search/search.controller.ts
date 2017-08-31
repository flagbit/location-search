import { IController, INgModelOptions } from 'angular';
import { QueryObservableInstance } from '../../commons/observables/query.observable';

export class SearchController implements IController {

  public subject: any;
  public query: string = '';
  public queryOptions: INgModelOptions = {
    debounce: 200
  }

  public queryChangeHandler() {
    console.log('QUERY CHANGE');
    QueryObservableInstance.get().next(this.query);
  }

  $onInit() {
    this.subject.subscribe(items => {
      // console.log('ITEMS #2', items);
    });
  }

}
