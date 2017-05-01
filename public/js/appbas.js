'use strict';

var app = angular.module('starter', ['ngResource', 'ngRoute']);

// app.config(function($routeProvider) {
//   $routeProvider
//     .when("/", {
//       templateUrl: "src/main.html",
//       controller: 'AppController'
//     })
// });

app.controller('AppController', function($scope, $resource) {

  var Basketball = $resource('/api/basketballs/:basketball_id', {
      basketball_id: '@id'
    },
    // PUT is not a bulid-in http method in ngResource
    {
      update: {
        method: 'PUT'
      }
    }
  )
  // need to declare in first use in side controller
  // unless we cannot access editBasketball via $scope
  $scope.editBasketball = {};
  $scope.result = {};
  $scope.basketballs = Basketball.query()
  $scope.edit = function(id) {
    Basketball.get({
      basketball_id: id
    }, function(basketball) {
      $scope.editBasketball.id = id
      $scope.editBasketball.team = basketball.team
      $scope.editBasketball.win = basketball.win
      $scope.editBasketball.lose = basketball.lose
      $scope.result = 'Edit basketball ' + id
      console.log('result message = ' +   $scope.result)
      $scope.get(id)
    })
  }
  $scope.update = function(id) {
    if ($scope.editBasketball.team != '') {
      Basketball.update({
        basketball_id: id
      }, {
        team: $scope.editBasketball.team,
        win: $scope.editBasketball.win,
        lose: $scope.editBasketball.lose
      });
      $scope.result = 'Basketball ' + id + ' is updated'
      console.log('result message = ' +   $scope.result)
      $scope.basketballs = Basketball.query();
      $scope.get(id)
    } else {
      $scope.result = 'Please enter updating bear by Select Edit button'
    }
  }
  $scope.delete = function(id) {
    Basketball.delete({
      basketball_id: id
    })
    $scope.result = 'Basketball ' + id + ' is deleted'
    console.log('result message = ' +   $scope.result)
    $scope.basketballs = Basketball.query();
  }
  $scope.add = function() {
    Basketball.save({
      team: $scope.addBasketball.team,
      win: $scope.addBasketball.win,
      lose: $scope.addBasketball.lose
    })
    $scope.result = 'Basketball ' + id + ' is created'
    console.log('result message = ' +   $scope.result)
    $scope.basketballs = Basketball.query();
  };

  // ======= function for front-end display with Angular ====
  $scope.isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
  }
  $scope.select = function(id, obj) {
    return id == obj.id
  }


});
