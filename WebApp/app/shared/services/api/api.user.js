angular
    .module('app.shared')
    .factory('ApiUser', ApiUser);

ApiUser.$inject = ['$log', 'API_URL', '$http', 'NO_IMAGE'];
function ApiUser($log, API_URL, $http, NO_IMAGE) {
    var userPrefix = 'user';

    return{
        userList: userList,
        getUserById: getUserById,
        getTopUser: getTopUser,
        updateUserProfile: updateUserProfile
    };

    function userList(reqBody, cb){
        return $http(_setupRequest('POST', userPrefix + '/list', reqBody))
            .then(function(res){
                _checkImage(res.data.data);
                cb(res.data);
            })
            .catch(function(res){
                cb(res.data);
            });
    }

    function getUserById(reqBody, cb){
        return $http(_setupRequest('POST', userPrefix + '/view', reqBody))
            .then(function(res){
                _checkImage(res.data);
                cb(res.data);
            })
            .catch(function(res){
                cb(res.data);
            });
    }

    function getTopUser(cb){
        return $http(_setupRequest('POST', userPrefix + '/top'))
            .then(function(res){
                _checkImage(res.data);
                cb(res.data);
            })
            .catch(function(res){
                cb(res.data);
            });
    }

    function updateUserProfile(reqBody, cb){
        return $http(_setupRequest('PUT', userPrefix, reqBody))
            .then(function(res){
                cb(res.data);
            })
            .catch(function(res){
                cb(res.data);
            });
    }

    function _checkImage(data){
        if(!Array.isArray(data)){
            if(!data.imageUrl) {
                data.imageUrl = NO_IMAGE.USER;
            }
        } else{
            data.forEach(function(i){
                if(!i.imageUrl){
                    i.imageUrl = NO_IMAGE.USER;
                }
            });
        }
    }

    function _setupRequest(method, uri, data){
        return {
            url: API_URL + uri,
            method: method,
            data: data
        };
    }
}