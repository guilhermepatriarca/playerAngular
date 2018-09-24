'use strict';

playerApp.controller('RegisterController',
 function registerController($scope, musicData){

    $scope.showPassword = false;
    $scope.registerDone = false;
    $scope.erroRegister = false;

    $scope.create = user =>{
        musicData.registerUser(user)
        .$promise.then((data)=>{
            $scope.registerDone = true;
        })
        .catch((response)=>{
            console.log(response)
            $scope.erroRegister = true;
        })
    }


});