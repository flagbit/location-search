// jshint strict: false
var dotenv = require('dotenv');
dotenv.config();

exports.config = {
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  commonCapabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_PASSWORD,
    'browserstack.debug': true
  },

  multiCapabilities: [
    {
      'browserName': 'Chrome'
    },
    {
      'browserName': 'Safari'
    },
    {
      'browserName': 'Firefox'
    },
    {
      'browserName': 'IE'
    },
    {
      'device': 'Samsung Galaxy S7',
      'realMobile': 'true',
      'browserName': 'android'
    },
    {
      'browserName': 'iPhone',
      'platform': 'MAC',
      'device': 'iPhone 6'
    },
    {
      'os': 'Windows',
      'os_version': 'XP',
      'browserName': 'IE',
      'browser_version': '7.0'
    }
  ],

  allScriptsTimeout: 11000,

  specs: [ '*.js' ],

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for (var i in exports.config.commonCapabilities) {
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  }
});