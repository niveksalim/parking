'use strict';

/**
 * @ngdoc service
 * @name parkingApiApp.staticService
 * @description
 * # staticService
 * Service in the parkingApiApp.
 */
angular.module('parkingApiApp')
  .service('staticService', function () {
    this.getMarkerIcon = function() {
      return {
        notAvailable: '',
        available: '/images/available.png',
        partiallyAvaialble: '/images/partially-available.png'
      };
    };

    this.getNLCoordinates = function() {
      return {
        lat: '52.36763394',
        long: '4.90058899'
      };
    };

    this.getStatic = function() {
      return {
        pixelOffsetX: 0,
        pixelOffsetY: -37
      };
    };

    this.getParkingGarageField = function() {
      return {
        parkingGarage: 'parking.garage',
        freeSpaceShort: 'FreeSpaceShort',
        shortCapacity: 'ShortCapacity',
        freeSpaceLong: 'FreeSpaceLong',
        longCapacity: 'LongCapacity',
        name: 'Name'
      };
    };
  });
