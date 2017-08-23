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
export const SearchModule = angular
  .module('SearchModule', [])
  .component('locationSearchSearch', SearchComponent)
  .value('locationSearchSearchTemplate', SearchTemplate)
;
