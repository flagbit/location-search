import { IComponentOptions } from 'angular';
import { MapController } from './map.controller';

export const MapComponent: IComponentOptions = {
  template: '',
  controller: MapController,
  controllerAs: 'ctrl',
  bindings: {
    subject: '='
  }
};
