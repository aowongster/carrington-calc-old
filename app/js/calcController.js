(function() {
  'use strict';

  angular
    .module('carringtonCalc')
    .controller('CalcCtrl', ['$scope', function ($scope) {
      var CRDAYS = 27.2753;               // Carrington Rotation definition
      var SECS = 1000 * 60 * 60 * 24;      // TS conversion to days
      var SDATE = "October 14, 1853";     // When CR Began
      var PRECISION = 4;                  // # of decimal places

      $scope.rotations = 0;
      $scope.dateString = new Date(SDATE);

      $scope.carrington2date = function () {
        var startDate = new Date(SDATE);
        var days = CRDAYS * $scope.rotations;
        $scope.dateString = new Date(startDate.setUTCDate(startDate.getUTCDate() + days));
      };

      $scope.date2carrington = function () {
        var startDate = new Date(SDATE);
        var days = ($scope.dateString.getTime() - startDate.getTime()) / SECS;
        var crNum = days / CRDAYS;
        $scope.rotations = parseFloat(crNum.toFixed(PRECISION));
      };

    }]);

})();
