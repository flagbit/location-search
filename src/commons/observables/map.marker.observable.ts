import { AbstractObservable } from './abstract.observable';
import { DataServiceInstance } from '../services/data.service';
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
    color: string = CONFIG.markerColor,
    strokeColor: string = CONFIG.markerStrokeColor,
    scale: number = 1.9,
    strokeWeight: number = 2
  ): google.maps.Symbol {
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
    return symbol;
  }

  private getMarkerLabel(
    text: string,
    color: string = CONFIG.markerStrokeColor,
    size: string = CONFIG.markerFontSize,
    weight: string = CONFIG.markerFontWeight
  ): google.maps.MarkerLabel {
    let label = {
      color: color,
      fontSize: size,
      fontWeight: weight,
      text: text
    }
    return label;
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
      marker.addListener(CONFIG.markerStateEvent, () => {
        DataServiceInstance.toggleItemActive(i);
      });
      markers.push(marker);
    }
    return markers;
  }

}

export const MapMarkerObservableInstance = new MapMarkerObservable;
