//
//
// =============================================================================
//
import { ListComponent } from './list.component';
import { ListTemplate } from './list.template';

//
// DEFINE ANGULAR MODULE
// =============================================================================
//
export const ListModule = angular
  .module('ListModule', [])
  .component('locationSearchList', ListComponent)
  .value('LocationSearchListTemplate', ListTemplate);
;
