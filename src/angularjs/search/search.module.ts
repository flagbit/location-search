//
//
// =============================================================================
//
import { SearchComponent } from './search.component';
import { SearchTemplate } from './search.template';

//
// DEFINE ANGULAR MODULE
// =============================================================================
//
export const LocationSearchSearchModule = angular
  .module('LocationSearchSearchModule', [])
  .component('locationSearchSearch', SearchComponent)
  .value('locationSearchSearchTemplate', SearchTemplate)
;
