'use strict';

describe('Carrington Controllers', function(){
    beforeEach(module('carringtonCalc'));

    var $controller;
    // $controller instantiation service
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));


    describe('CalcCtrl', function() {
        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller('CalcCtrl', {$scope: $scope})
        });

        it('dummy should be true', function() {
            expect(true);
        });

        it('should set the default rotations to 0', function(){
            expect($scope.rotations).toBe(0);
        });
        it('should set the default date to be October 14th, 1853', function(){
            expect($scope.dateString).toEqual(new Date("October 14, 1853"));
        });

        it('tests the calculation of carrington rotation date given a number', function() {
          $scope.rotations = 1;
          $scope.carrington2date();
          expect($scope.dateString).not.toBeNull();
        });

        it('tests the date calculation to rotations', function(){
          $scope.dateString = new Date("January 23, 1987");
          $scope.date2carrington();
          expect($scope.rotations).toBeCloseTo(1784.6932);
        });

    });
});