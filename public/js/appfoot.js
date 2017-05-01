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

  var Football = $resource('/api/footballs/:football_id', {
      football_id: '@id'
    },
    // PUT is not a bulid-in http method in ngResource
    {
      update: {
        method: 'PUT'
      }
    }
  )
  // need to declare in first use in side controller
  // unless we cannot access editFootball via $scope
  $scope.editFootball = {};
  $scope.result = {};
  $scope.footballs = Football.query()

  $scope.edit = function(id) {
    Football.get({
      football_id: id
    }, function(football) {
      $scope.editFootball.id = id
      $scope.editFootball.team = football.team
   
      $scope.editFootball.win = football.win
      $scope.editFootball.drew = football.drew
      $scope.editFootball.lose = football.lose

      $scope.result = 'Edit football ' + id
      console.log('result message = ' +   $scope.result)
      $scope.get(id)
    })
  }
  $scope.update = function(id) {
    if ($scope.editFootball.team != '') {
      Football.update({
        football_id: id
      }, {
        team: $scope.editFootball.team,

        win: $scope.editFootball.win,
        drew: $scope.editFootball.drew,
        lose: $scope.editFootball.lose
      });
      $scope.result = 'Football ' + id + ' is updated'
      console.log('result message = ' +   $scope.result)
      $scope.footballs = Football.query();
      $scope.get(id)
    } else {
      $scope.result = 'Please enter updating bear by Select Edit button'
    }
  }
  $scope.delete = function(id) {
    Football.delete({
      football_id: id
    })
    $scope.result = 'Football ' + id + ' is deleted'
    console.log('result message = ' +   $scope.result)
    $scope.footballs = Football.query();
  }
  $scope.add = function() {
    Football.save({
      team: $scope.addFootball.team,
       
        win: $scope.addFootball.win,
        drew: $scope.addFootball.drew,
        lose: $scope.addFootball.lose
    })
    $scope.result = 'Football ' + id + ' is created'
    console.log('result message = ' +   $scope.result)
    $scope.footballs = Football.query();
  };

  // ======= function for front-end display with Angular ====
  $scope.isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
  }
  $scope.select = function(id, obj) {
    return id == obj.id
  }


});
