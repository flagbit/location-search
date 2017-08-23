import 'angular';
import * as _angular_ from 'angular';
declare global {
  const angular: typeof _angular_;
}

//
//
// =============================================================================
//
import { LocationSearchComponent } from './location.search.component';
import { SearchModule } from './search/search.module';
import { MapModule } from './map/map.module';
import { ListModule } from './list/list.module';
import { PaginationModule } from './pagination/pagination.module';
import { LocationSearchTemplate } from './location.search.template';

//
// DEFINE ANGULAR MODULE
// =============================================================================
//
export const LocationSearchModule = angular
  .module('LocationSearchModule', [
    SearchModule.name,
    MapModule.name,
    ListModule.name,
    PaginationModule.name
  ])
  .component('locationSearch', LocationSearchComponent)
  .value('locationSearchTemplate', LocationSearchTemplate)
  .config(($compileProvider) => {
    if (window['APPLICATION_ENV'] !== 'development') {
      $compileProvider.debugInfoEnabled(false);
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(false);
    }
  })
;
