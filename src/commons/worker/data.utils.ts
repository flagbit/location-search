import { MAPS_API_ENDPOINT, MAPS_API_KEY } from '../config/maps';

export class DataUtils {

  public static shuffle(data: Array<any>): Array<any> {
    let i = data.length - 1;
    while (i > 0) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = data[i];
      data[i] = data[j];
      data[j] = tmp;
      i--;
    }
    return data;
  }

  public static getDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string
  ): number {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  public static geocodeAddress(address: string, country: string): Promise<any> {
    let promise = new Promise((resolve) => {
      self.fetch(`${MAPS_API_ENDPOINT}?address=${address}&key=${MAPS_API_KEY}&components=country:${country}`).then((res) => {
        res.json().then((json) => {
          // TODO check how long the list of results is => if its too long then return false!
          resolve(json.results[0]);
        });
      })
    });
    return promise;
  }

  public static orderByField(list: Array<any>, field: string): Array<any> {
    return list.sort((a, b) => {
      let result = (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0;
      // console.log('* order by field', result)
      return result;
    });
  }

  public static dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

}
