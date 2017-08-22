import { AbstractObservable } from './abstract.observable';

class UserLocation extends AbstractObservable {

  public location: any = null;

  constructor() {
    super();
    this.getUserLocation();
  }

  private saveAndSendPosition(lat, lng) {
    let currentPosition = {
      latitude: lat,
      longitude: lng
    }
    sessionStorage.setItem('position', JSON.stringify(currentPosition));
    this.subject.next(currentPosition);
  }

  private queryPosition() {
    navigator.geolocation.getCurrentPosition(
      // User gave permission to catch his position
      (position) => {
        this.saveAndSendPosition(position.coords.latitude, position.coords.longitude);
      },
      // User denied permission to his geolocation -> get by IP
      () => {
        fetch(`http://geoip.mralexandernickel.com`).then((res) => {
          res.json().then((position) => {
            this.saveAndSendPosition(position.latitude, position.longitude);
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
