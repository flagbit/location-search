System.config({
  paths: {
    'npm:': 'node_modules/'
  },
  map: {
    'angular': 'npm:angular/angular',
    'rxjs': 'npm:rxjs'
  },
  packages: {
    'app': {
      defaultExtension: 'js'
    },
    'lib': {
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'node_modules': {
      defaultExtension: 'js'
    }
  }
});