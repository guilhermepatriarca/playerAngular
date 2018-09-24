playerApp.factory('musicData', ($resource, $http) => {

    const resourcesSongs = $resource('https://songs-api-ubiwhere.now.sh/api/songs');
    const resourcesRegister = $resource('https://songs-api-ubiwhere.now.sh/api/auth/register');
    const resourcesLogin = $resource('https://songs-api-ubiwhere.now.sh/api/auth/login');
    let userStatus = false;
    let token = null;

    return {
        getMusics: () => {
            return resourcesSongs.query();
        },
        getMusic: id => {
            return resourcesSongs.query({
                id: id
            })
        },
        registerUser: user => {
            return resourcesRegister.save(user)
        },
        loginUser: user => {
            return resourcesLogin.save({
                email: user.email,
                password: user.password
            })
        },
        changeUserStatus: istoken => {
            userStatus = !userStatus;
            userStatus === true ? token = istoken : token = null;
        },
        getUserStatus: () => {
            return userStatus;
        },
        setUser: () => {
            return $http.get('https://songs-api-ubiwhere.now.sh/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        },
        getFavorite: () => {
            return $http.get('https://songs-api-ubiwhere.now.sh/api/user-favorites/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        },
        setFavorite: (musicId) => {
            return $http.post('https://songs-api-ubiwhere.now.sh/api/user-favorites/', {
                songId: musicId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        },
        RemoveFavorite: (musicId) => {
            return $http({
                method: "DELETE",
                url: "https://songs-api-ubiwhere.now.sh/api/user-favorites/",
                   data: {
                        songId:musicId
                    }
                ,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        }
    }
})