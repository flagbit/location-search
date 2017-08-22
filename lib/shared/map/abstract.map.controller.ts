import { THEME_3 } from '../themes/theme.3';
import UserLocation from '../observables/user.location.observable';
import { MapMarkerObservableInstance } from '../observables/map.marker.observable';
import { CONFIG } from '../config/config';

export abstract class AbstractMapController {

  protected element: Element;
  public markers: Array<google.maps.Marker> = [];
  public map: google.maps.Map;

  constructor() {
    this.subscribeMarkers();
  }

  public subscribeMarkers(): void {
    MapMarkerObservableInstance.get().subscribe((markers) => {
      if (markers !== null) {
        this.clearMarkers();
        this.markers = markers;
        this.drawMarkers();
      }
    });
  }

  public clearMarkers(): void {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  public drawMarkers(): void {
    if (this.map && this.markers) {
      let bounds = new google.maps.LatLngBounds;
      for (let marker of this.markers) {
        bounds.extend(marker.getPosition());
        marker.setMap(this.map);
      }
      this.map.fitBounds(bounds);
    }
  }

  public renderMap(): void {
    UserLocation.get().subscribe((res) => {
      if (res !== null) {
        let config = {
          zoom: CONFIG.mapZoomInitial,
          maxZoom: CONFIG.mapZoomMax,
          center: new google.maps.LatLng(res.latitude, res.longitude),
          disableDefaultUI: true,
          draggable: true,
          scrollwheel: false,
          scaleControl: false,
          zoomControl: false,
          styles: <any>THEME_3
        };
        this.map = new google.maps.Map(this.element, config);
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          this.drawMarkers();
        });
      }
    });
  }
}
