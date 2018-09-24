'use strict';

playerApp.controller('navBarController',
function loginController($scope, musicData,$location){

    $scope.navbarlogin =musicData.getUserStatus();
     musicData.setUser().then((data)=>{$scope.userEmail =data.data.name});

    $scope.logout  = () =>{
    musicData.changeUserStatus();
    $location.path('/login');
    }

});