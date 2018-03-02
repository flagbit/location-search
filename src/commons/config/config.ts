export const CONFIG = {
  maxResults: 1000,
  resourceUrl: '/data/output.json',
  fieldName: 'name_1',
  fieldStreet: 'Strasse',
  fieldZip: 'PLZ',
  fieldCity: 'Ort',
  fieldLat: 'lat',
  fieldLng: 'lng',
  initialFilters: 'name zip street city',
  prioFilters: 'name',
  itemsPerPage: 3,
  queryMinLength: 2,
  markerColor: '#000000',
  markerActiveColor: '#c4301a',
  markerStrokeColor: '#ffffff',
  markerFontSize: '16px',
  markerFontWeight: '800',
  markerStateEvent: 'click',
  distanceValidInitial: 2000,
  distanceStep: 1,
  distanceMax: 5000,
  mapZoomInitial: 14,
  mapZoomMax: 16
}
export const WORKER_PATH = (window && window['APPLICATION_ENV'] === 'search.development')
  ? '/dist'
  : '/node_modules/@flagbit/location-search/dist';
