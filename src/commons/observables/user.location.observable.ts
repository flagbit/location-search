import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AbstractObservable } from './abstract.observable';
import { MAPS_API_ENDPOINT, MAPS_API_KEY } from '../config/maps';

class UserLocation extends AbstractObservable {

  public location: any = null;

  public get(): BehaviorSubject<any> {
    this.getUserLocation();
    return super.get();
  }

  private saveAndSendPosition(lat, lng, country) {
    let currentPosition = {
      latitude: lat,
      longitude: lng,
      country: country
    }
    sessionStorage.setItem('position', JSON.stringify(currentPosition));
    this.subject.next(currentPosition);
  }

  private queryPosition() {
    navigator.geolocation.getCurrentPosition(
      // User gave permission to catch his position
      (position) => {
        const latLng = `${position.coords.latitude},${position.coords.longitude}`;
        fetch(`${MAPS_API_ENDPOINT}?latlng=${latLng}&key=${MAPS_API_KEY}`).then((response: any) => {
          response.json().then((reverseResult: any) => {
            const topMatch = reverseResult.results.pop();
            const countryComponent = topMatch.address_components.find((item) => {
              return item.types.indexOf('country') !== -1;
            });
            const countryCode = countryComponent.short_name;
            this.saveAndSendPosition(position.coords.latitude, position.coords.longitude, countryCode);
          });
        });
      },
      // User denied permission to his geolocation -> get by IP
      () => {
        fetch(`https://geoip.mralexandernickel.com`).then((res) => {
          res.json().then((position) => {
            this.saveAndSendPosition(position.latitude, position.longitude, position.country);
          });
        })
      }
    )
  }

  private getUserLocation(): void {
    if (sessionStorage.getItem('position')) {
      this.subject.next(JSON.parse(sessionStorage.getItem('position')));
    } else {
      this.queryPosition();
    }
  }
}

export default new UserLocation;
