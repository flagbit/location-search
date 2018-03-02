//
//
// =============================================================================
//
import { SearchComponent } from './search.component';

//
// DEFINE ANGULAR MODULE
// =============================================================================
//
export const LocationSearchSearchModule = angular
  .module('LocationSearchSearchModule', [])
  .component('locationSearchSearch', SearchComponent)
  .value('locationSearchSearchTemplate', require('./search.template.html'))
;
