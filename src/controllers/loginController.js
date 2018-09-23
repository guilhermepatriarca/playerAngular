'use strict';

playerApp.controller('LoginController',
 function registerController($scope,$location, musicData){

    $scope.showPassword = false;
    $scope.alertError = false;
    
    $scope.sendToMusic = () =>{
        $location.path('/musics');
    }

    $scope.create = user =>{
        musicData.loginUser(user)
        .$promise.then((data)=>{
            $location.path('/musics');
            musicData.changeUserStatus(data.token);
        })
        .catch((response)=>{
            $scope.alertError = true;
            $scope.messageError = response.data.message; 
            setTimeout(function(){
                $scope.alertError = false;
            }, 3000);         
        })
    }

});