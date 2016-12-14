angular
    .module('app.shared')
    .factory('ApiUser', ApiUser);

ApiUser.$inject = ['$log', 'API_URL', '$http'];
function ApiUser($log, API_URL, $http) {
    var userPrefix = 'user';

    return{
        userList: userList,
        getUserById: getUserById,
        getTopUser: getTopUser
    };

    function userList(reqBody, cb){
        return $http(_setupRequest('POST', userPrefix + '/list', reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function getUserById(reqBody, cb){
        return $http(_setupRequest('POST', userPrefix + '/view', reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function getTopUser(cb){
        return $http(_setupRequest('POST', userPrefix + '/top'))
            .then(function(res){
                cb(res.data);
            });
    }

    function _setupRequest(method, uri, data){
        return {
            url: API_URL + uri,
            method: method,
            data: data
        };
    }
}