import 'angular';
import * as _angular_ from 'angular';
declare global {
  const angular: typeof _angular_;
}

import 'whatwg-fetch/fetch.js';

//
//
// =============================================================================
//
import { LocationSearchComponent } from './location.search.component';
import { LocationSearchSearchModule } from './search/search.module';
import { MapModule } from './map/map.module';
import { ListModule } from './list/list.module';
import { LocationSearchPaginationModule } from './pagination/pagination.module';

//
// DEFINE ANGULAR MODULE
// =============================================================================
//
export const LocationSearchModule = angular
  .module('LocationSearchModule', [
    LocationSearchSearchModule.name,
    MapModule.name,
    ListModule.name,
    LocationSearchPaginationModule.name
  ])
  .component('locationSearch', LocationSearchComponent)
  .value('locationSearchTemplate', require('./location.search.template.html'))
  /*
  .config(($compileProvider) => {
    if (window['APPLICATION_ENV'] !== 'development') {
      $compileProvider.debugInfoEnabled(false);
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(false);
    }
  })
  */
;
