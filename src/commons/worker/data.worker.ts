import 'whatwg-fetch/fetch.js';
import { DataUtils } from './data.utils';

class Deferred {
  public promise: any;
  public reject: any;
  public resolve: any;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}

class DataWorker {

  private locations: Array<any>;
  private config: any;
  private userLocation: any;
  private userLocationPromise: Deferred;
  private locationsPromise: Deferred;
  private lastResult: Array<any>;
  private locationsNearby: Array<any>;

  public currentPage: number = 0;

  constructor() {
    this.userLocationPromise = new Deferred();
    this.locationsPromise = new Deferred();
  }

  public setConfig(config): void {
    config.initialFilters = config.initialFilters.split(' ');
    config.prioFilters = config.prioFilters.split(' ');
    this.config = config;
    console.log('*** SET CONFIG', config);
    this.getData();
    this.sendInitialResponse();
  }

  private sendInitialResponse(): void {
    console.log('sendInitialResponse');
    Promise.all([
      this.userLocationPromise.promise,
      this.locationsPromise.promise
    ]).then(() => {
      this.locationsNearby = this.getLocationsNearby(this.userLocation.latitude, this.userLocation.longitude);
      if (this.locationsNearby) {
        this.sendResponse(this.locationsNearby, false);
      } else {
        this.sendResponse(this.locations);
      }
    });
  }

  private getData(): void {
    self.fetch(this.config.resourceUrl).then((res) => {
      res.json().then((locations) => {
        this.setLocations(locations);
        console.log('SET LOCATIONS')
        this.locationsPromise.resolve();
      })
    });
  }

  public setUserLocation(location): void {
    if (location) {
      this.userLocation = location;
      console.log('SET USER LOCATION', location);
      this.userLocationPromise.resolve();
    }
  }

  private resetCurrentPage(): void {
    console.log('*** RESET CURRENT PAGE');
    this.currentPage = 0;
  }

  private setCurrentPage(pageNum: number): void {
    console.log('*** setCurrentPage in WORKER', pageNum, this.locations.length);
    this.currentPage = pageNum;
    this.sendResponse(this.lastResult, false);
  }

  private setLocations(locations): void {
    for (let location of locations) {
      location.active = false;
    }
    // drop all locations that should not be shown from the beginning
    this.locations = locations.filter((location) => {
      return location.show_in_salonfinder !== '0';
    });
    console.log('LOCATIONS IN TOTAL', this.locations.length);
  }

  public filter(query: string): void {
    if (this.locations) {
      if (query.length <= this.config.queryMinLength) {
        console.log('=== NOT LONG ENOUGH');
        this.locationsNearby = this.getLocationsNearby(this.userLocation.latitude, this.userLocation.longitude);
        this.sendResponse(this.locationsNearby, false);
      } else {
        let matches = this.getMatchesInFields(query, this.config.prioFilters);
        if (matches.length) {
          console.log('=== FOUND IN PRIO', matches);
          this.sendResponse(matches, false);
        } else {
          DataUtils.geocodeAddress(query, this.userLocation.country).then((result) => {
            console.log('=== GEOCODE RESULT', result);
            if (result) {
              let locationsNearby = this.getLocationsNearby(result.geometry.location.lat, result.geometry.location.lng);
              if (locationsNearby) {
                this.sendResponse(locationsNearby, false);
              } else {
                let results = this.getLocationsByTerm(query);
                if (!results.length) {
                  results = this.locationsNearby;
                }
                this.sendResponse(results);
              }
            } else {
              let results = this.getLocationsByTerm(query);
              if (!results.length) {
                results = this.locationsNearby;
              }
              this.sendResponse(results);
            }
          });
        }
      }
    } else {
      console.error('LOCATIONS NOT SET!');
    }
  }

  private getLocationsByTerm(query: string): Array<any> {
    console.log('=== GET BY TERM');
    this.resetCurrentPage();
    let result = this.getMatchesInFields(query, this.config.initialFilters);
    let ordered = DataUtils.orderByField(result, 'distance');
    this.lastResult = ordered;
    return result;
  }

  private getLocationsNearby(lat: number, lng: number): Array<any> {
    console.log('=== GET NEARBY');
    this.resetCurrentPage();
    let distanceValid = this.config.distanceValidInitial;
    let result = [];

    while (!result.length && distanceValid <= this.config.distanceMax) {
      result = this.locations.filter((location) => {
        location.distance = DataUtils.getDistance(lat, lng, location[this.config.fieldLat], location[this.config.fieldLng], 'K');
        return location.distance <= distanceValid;
      });
      if (!result.length) {
        console.log('RADIUS ERWEITERN!');
        distanceValid += this.config.distanceStep;
      }
    }
    console.log('*** LENGTH', result.length);
    console.log('*** FIRST BEFORE', result[0]);
    if (!result.length) {
      result = this.locationsNearby;
    }
    let ordered = DataUtils.orderByField(result, 'distance');
    console.log('*** FIRST AFTER', ordered[0]);
    this.lastResult = ordered;
    return ordered;
  }

  private getMatchesInFields(query: string, fields: Array<string>): Array<any> {
    this.resetCurrentPage();
    let result = this.locations.filter((location) => {

      // if one of the fields does match, put location into list of results
      for (let filter of fields) {
        let nameProperty = this.config[`field${filter.charAt(0).toUpperCase() + filter.slice(1)}`];
        if (location[nameProperty]) {
          let fieldMatch = location[nameProperty].toLowerCase().indexOf(query.toLowerCase()) !== -1;
          if (fieldMatch) {
            return true
          };
        } else {
          return false;
        }
      }

    });
    return result;
  }

  private sendResponse(data: Array<any>, shuffle: boolean = true): void {
    let message = {
      items: data,
      shuffled: false,
      totalItems: data.length,
      currentPage: this.currentPage
    };
    if (shuffle) {
      DataUtils.shuffle(data);
      message.shuffled = true;
      console.log('*** SHUFFLE', data[0]);
    }
    if (this.config.maxResults) {
      message.items = data.slice(0, this.config.maxResults);
      console.log('*** MAX RESULTS', data[0]);
    }
    if (this.config.itemsPerPage) {
      console.log('*** CURRENT PAGE', this.currentPage);
      let start = this.currentPage * this.config.itemsPerPage;
      console.log('*** START INDEX', start);
      message.items = data.slice(start, start + this.config.itemsPerPage);
    }
    console.log('*** IMMEDIATE BEFORE POST', message);
    (postMessage as any)(message);
  }
}
const dataWorker = new DataWorker;

onmessage = (message) => {
  if (message.data.type && dataWorker[message.data.type]) {
    dataWorker[message.data.type](message.data.payload);
  }
}
