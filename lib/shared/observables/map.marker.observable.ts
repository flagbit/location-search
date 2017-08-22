import { AbstractObservable } from '../../shared/observables/abstract.observable';
import { DataServiceInstance } from '../data/data.service';
import { CONFIG } from '../config/config';

export class MapMarkerObservable extends AbstractObservable {

  constructor() {
    super();
    this.subscribeData();
  }

  private subscribeData() {
    DataServiceInstance.get().subscribe(data => {
      if (data) {
        let markers = this.generateMarkers(data.items);
        this.subject.next(markers);
      }
    });
  }

  private generateMarkers(locations): Array<google.maps.Marker> {
    let markers: Array<google.maps.Marker> = [];
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i];
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[CONFIG.fieldLat], location[CONFIG.fieldLng])
      });
      marker.addListener('click', () => {
        DataServiceInstance.toggleItemActive(i);
      });
      markers.push(marker);
    }
    return markers;
  }

}

export const MapMarkerObservableInstance = new MapMarkerObservable;
