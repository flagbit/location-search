import { IComponentOptions } from 'angular';
import { SearchController } from './search.controller';

export const SearchComponent: IComponentOptions = {
  template: locationSearchSearchTemplate => {
    return locationSearchSearchTemplate;
  },
  controller: SearchController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
