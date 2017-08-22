import { IComponentOptions } from 'angular';
import { SearchController } from './search.controller';

export const SearchTemplate =
`<input
  placeholder="search"
  ng-model="ctrl.query"
  ng-change="ctrl.queryChangeHandler()"
  ng-model-options="ctrl.queryOptions"
  style="display:block;width:100%;height:40px;line-height:40px;">
`;

export const SearchComponent: IComponentOptions = {
  template: SearchTemplate,
  controller: SearchController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
