import { PaginationComponent } from './pagination.component';
import { PaginationTemplate } from './pagination.template';

export const LocationSearchPaginationModule = angular
  .module('LocationSearchPaginationModule', [])
  .component('locationSearchPagination', PaginationComponent)
  .value('locationSearchPaginationTemplate', PaginationTemplate)
;
