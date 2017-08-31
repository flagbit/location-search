import { IComponentOptions } from 'angular';
import { PaginationController } from './pagination.controller';

export const PaginationComponent: IComponentOptions = {
  template: locationSearchPaginationTemplate => {
    return locationSearchPaginationTemplate;
  },
  controller: PaginationController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
