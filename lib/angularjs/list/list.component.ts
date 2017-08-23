import { IComponentOptions } from 'angular';
import { ListController } from './list.controller';

export const ListComponent: IComponentOptions = {
  template: LocationSearchListTemplate => {
    return LocationSearchListTemplate;
  },
  controller: ListController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
