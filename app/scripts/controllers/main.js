'use strict';

/**
 * @ngdoc function
 * @name parkingApiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkingApiApp
 */
angular.module('parkingApiApp')
  .controller('MainCtrl', function ($scope, parkingService, staticService) {
    var map;
    $scope.$on('mapInitialized', function(evt, evtMap) {
      map = evtMap;
    });

    $scope.features = [];
    parkingService.getParkings(25).then(function(response) {
      if(response && response.data && response.data.status === 'ok') {
        $scope.features = response.data.features;
        $scope.features.forEach(function(feature) {
          feature.theCoordinates = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
          var theData = feature.properties.layers[staticService.getParkingGarageField().parkingGarage].data;
          feature.theIcon = parkingService.getGarageAvailabilityIcon(theData);
          feature.garageAvailability = parkingService.garageAvailability(theData);
          feature.name = theData[staticService.getParkingGarageField().name];
        });
        $scope.center = staticService.getNLCoordinates().lat + ',' + staticService.getNLCoordinates().long;
      }
    });
    $scope.showGarage = function(event, garage) {
      $scope.selectedGarage = garage;
      var theData = $scope.selectedGarage.properties.layers[staticService.getParkingGarageField().parkingGarage].data;
      var infowindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(staticService.getStatic().pixelOffsetX, staticService.getStatic().pixelOffsetY)
      });
      var center = new google.maps.LatLng(garage.theCoordinates[0], garage.theCoordinates[1]);

      infowindow.setContent(
        parkingService.getInfoWindowTemplate(theData)
      );

      infowindow.setPosition(center);
      infowindow.open(map);
    };
  });
