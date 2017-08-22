import { IComponentOptions } from 'angular';
import { ListController } from './list.controller';

export const LIST_TEMPLATE =
`<ul>
  <li
    ng-repeat="location in ctrl.locations"
    ng-click="ctrl.toggleItemActive($index)">
    <pre>{{ location | json }}</pre>
  </li>
</ul>`;

export const ListComponent: IComponentOptions = {
  template: LIST_TEMPLATE,
  controller: ListController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
