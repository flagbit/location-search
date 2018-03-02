import { PaginationComponent } from './pagination.component';

export const LocationSearchPaginationModule = angular
  .module('LocationSearchPaginationModule', [])
  .component('locationSearchPagination', PaginationComponent)
  .value('locationSearchPaginationTemplate', require('./pagination.template.html'))
;
