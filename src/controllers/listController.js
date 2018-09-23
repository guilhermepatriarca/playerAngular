'use strict';

playerApp.controller('MusicController',
  function loginController($scope, musicData,$location,$filter) {

let currentUserId =null;
let objs;

    $scope.userLogin = musicData.getUserStatus();
    musicData.setUser().then((data) => {
      currentUserId = data.id;
  });

  $scope.moreInformation= id =>{
    $location.path(`/music${id}`);
  }

  $scope.addToFavorites = musicId =>{
    let find = $filter('filter')(objs, {id: musicId}, true);
    if(!find[0].favorite){
      musicData.setFavorite(musicId).then((data)=>{
        find[0].favorite = true;
        $scope.musics =objs;
      }).catch((response)=>{
      })
    }else{
      musicData.RemoveFavorite(musicId)
      .then((data)=>{
          find[0].favorite = false;
          $scope.musics =objs;
      }).
      catch((response)=>{

      })
    }
    
  }

    musicData.getMusics()
      .$promise.then((data) => {
        objs = data;
        for (const iterator of objs) {
          iterator.favorite = false;
        }
        musicData.getFavorite().then((data)=>{
          for (const item of data.data) {
            let find = $filter('filter')(objs, {id: item.songId}, true);
            try {
            find[0].favorite = true;
            }catch (e){}
          }
          $scope.musics =objs;
        }).catch((response)=>{
          $scope.musics =objs;
        })
      
      })
      .catch((response) => {
        console.log(`Error: ${response}`)
      })
  });