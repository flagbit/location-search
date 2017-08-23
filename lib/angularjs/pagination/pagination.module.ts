import { PaginationComponent } from './pagination.component';
import { PaginationTemplate } from './pagination.template';

export const PaginationModule = angular
  .module('PaginationModule', [])
  .component('locationSearchPagination', PaginationComponent)
  .value('locationSearchPaginationTemplate', PaginationTemplate)
;
