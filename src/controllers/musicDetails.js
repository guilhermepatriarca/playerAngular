'use strict';

playerApp.controller('DetailMusicController',
function loginController($scope, musicData, $routeParams){


    musicData.getMusic($routeParams.musicId)
    .$promise.then((data)=>{$scope.music = data[0]})
            .catch((response)=>{`Error: ${response}`})
});