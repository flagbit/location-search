import 'angular';
import * as _angular_ from 'angular';
declare global {
  const angular: typeof _angular_;
}
import '/node_modules/angular-utils-pagination/dirPagination.js';

//
//
// =============================================================================
//
import { LocationSearchComponent } from './location.search.component';
import { SearchModule } from './search/search.module';
import { MapModule } from './map/map.module';
import { ListModule } from './list/list.module';
import { PaginationModule } from './pagination/pagination.module';

//
// DEFINE ANGULAR MODULE
// =============================================================================
//
export const LocationSearchModule = angular
  .module('LocationSearchModule', [
    'angularUtils.directives.dirPagination',
    SearchModule.name,
    MapModule.name,
    ListModule.name,
    PaginationModule.name
  ])
  .component('locationSearch', LocationSearchComponent)
;
