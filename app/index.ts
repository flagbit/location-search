import '/bundle.js'
// import { LocationSearchModule } from '../lib/angularjs/location.search.module';
import { ApplicationController } from './controllers/application.controller';

angular
  .module('app', [
    'LocationSearchModule'
  ])
  .controller('ApplicationController', ApplicationController)
;

angular.bootstrap(document.documentElement, ['app']);
