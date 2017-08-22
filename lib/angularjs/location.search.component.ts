import { IComponentOptions } from 'angular';
import { LocationSearchController } from './location.search.controller';

export const LocationSearchTemplate =
`<location-search-search
  style="display:block;width:100%;"
  subject="ctrl.listSubject">
</location-search-search>
<location-search-map
  style="display:block;height:800px;width:66%;float:left"
  subject="ctrl.listSubject">
</location-search-map>
<location-search-list
  style="display:block;height:800px;width:34%;float:left"
  subject="ctrl.listSubject">
</location-search-list>
<location-search-pagination
  subject="ctrl.listSubject">
</location-search-pagination>`;

export const LocationSearchComponent: IComponentOptions = {
  template: LocationSearchTemplate,
  controller: LocationSearchController,
  controllerAs: 'ctrl',
  bindings: {
  }
};
