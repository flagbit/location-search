import { IComponentOptions } from 'angular';
import { LocationSearchController } from './location.search.controller';

export const LocationSearchComponent: IComponentOptions = {
  template: locationSearchTemplate => {
    return locationSearchTemplate;
  },
  controller: LocationSearchController,
  controllerAs: 'ctrl',
  bindings: {
  }
};
