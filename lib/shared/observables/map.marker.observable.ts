import { AbstractObservable } from '../../shared/observables/abstract.observable';
import { DataServiceInstance } from '../data/data.service';
import { CONFIG } from '../config/config';
import { MARKER_2 } from '../themes/marker/marker.2';

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

  private getMarkerSymbol(
    color = CONFIG.markerColor,
    strokeColor = CONFIG.markerStrokeColor,
    scale = 1.9,
    strokeWeight = 2
  ) {
    let symbol = {
      path: MARKER_2,
      fillColor: color,
      fillOpacity: 1,
      strokeColor: strokeColor,
      strokeWeight: strokeWeight,
      scale: scale,
      anchor: new google.maps.Point(11.7, 22),
      labelOrigin: new google.maps.Point(12, 10)
    }
    return symbol
  }

  private getMarkerLabel(
    text,
    color = CONFIG.markerStrokeColor,
    size = CONFIG.markerFontSize,
    weight = CONFIG.markerFontWeight
  ) {
    let label = {
      color: color,
      fontSize: size,
      fontWeight: weight,
      text: text
    }
    return label
  }

  private generateMarkers(locations): Array<google.maps.Marker> {
    let markers: Array<google.maps.Marker> = [];
    for (let i = 0; i < locations.length; i++) {
      let location = locations[i];
      let markerSymbolColor = location.active ? CONFIG.markerActiveColor : CONFIG.markerColor;
      let markerOptions: google.maps.MarkerOptions = {
        position: new google.maps.LatLng(location[CONFIG.fieldLat], location[CONFIG.fieldLng]),
        icon: this.getMarkerSymbol(markerSymbolColor),
        label: this.getMarkerLabel(ALPHABET[i])
      }
      let marker = new google.maps.Marker(markerOptions);
      marker.addListener('click', () => {
        DataServiceInstance.toggleItemActive(i);
      });
      markers.push(marker);
    }
    return markers;
  }

}

export const MapMarkerObservableInstance = new MapMarkerObservable;
