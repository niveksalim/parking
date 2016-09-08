'use strict';

/**
 * @ngdoc service
 * @name parkingApiApp.parkingService
 * @description
 * # parkingService
 * Service in the parkingApiApp.
 */
angular.module('parkingApiApp')
  .service('parkingService', function ($http, config, staticService) {
    this.getParkings = function(limit) {
      var urlBase = config.apiUrl + '/parking?limit=' + limit;
      return $http.get(urlBase);
    };

    this.getInfoWindowTemplate = function(theData) {
      var garageAvailability = this.garageAvailability(theData);
      return '<h3>' + theData[staticService.getParkingGarageField().name] + '</h3>' +
        '<p>Free Space Short  : ' + garageAvailability.freeSpaceShort + '</p>' +
        '<p>Free Space Long   : ' + garageAvailability.freeSpaceLong + '</p>';
    };

    this.garageAvailability = function(theData) {
      return {
        freeSpaceShort: (theData[staticService.getParkingGarageField().freeSpaceShort] || '-') + ' / ' + (theData[staticService.getParkingGarageField().shortCapacity] || '-'),
        freeSpaceLong: (theData[staticService.getParkingGarageField().freeSpaceLong] || '-') + ' / ' + (theData[staticService.getParkingGarageField().longCapacity] || '-')
      };
    };

    this.isGarageAvailable = function(theData) {
      var isAvailable = true;
      var freeShort = theData[staticService.getParkingGarageField().freeSpaceShort];
      if(freeShort && freeShort === 0) {
        isAvailable = false;
      }
      var freeLong = theData[staticService.getParkingGarageField().freeSpaceLong];
      if(freeLong && freeLong === 0) {
        isAvailable = false;
      }

      return isAvailable;
    };

    this.getGarageAvailabilityIcon = function(theData) {
      var theIcon = '';
      var isShortOk = false;
      var freeShort = theData[staticService.getParkingGarageField().freeSpaceShort];
      var shortCapacity = theData[staticService.getParkingGarageField().shortCapacity];
      if(freeShort && freeShort > 0 && shortCapacity && shortCapacity > 0) {
        isShortOk = true;
      } else if(!freeShort && !shortCapacity) {
        isLongOk = true;
      }

      var isLongOk = false;
      var freeLong = theData[staticService.getParkingGarageField().freeSpaceLong];
      var longCapacity = theData[staticService.getParkingGarageField().longCapacity];
      if(freeLong && freeLong > 0 && longCapacity && longCapacity > 0) {
        isLongOk = true;
      } else if(!freeLong && !longCapacity) {
        isLongOk = true;
      }

      if(isShortOk && isLongOk) {
        theIcon = staticService.getMarkerIcon().available;
      } else if(!isShortOk && !isLongOk) {
        theIcon = staticService.getMarkerIcon().notAvailable;
      } else {
        theIcon = staticService.getMarkerIcon().partiallyAvaialble;
      }

      return theIcon;
    }
  });
