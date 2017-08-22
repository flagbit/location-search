import { IComponentOptions } from 'angular';
import { PaginationController } from './pagination.controller';

const PAGINATION_TEMPLATE =
`<h2>{{ ctrl.currentPage }}</h2>
<ul>
  <li
    ng-repeat="page in ctrl.pages track by $index"
    ng-click="ctrl.gotoPage($index)">
    Goto {{$index}}
  </li>
</ul>`;

export const PaginationComponent: IComponentOptions = {
  template: PAGINATION_TEMPLATE,
  controller: PaginationController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
