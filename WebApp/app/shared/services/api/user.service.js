angular
    .module('app.shared')
    .factory('ApiUser', ApiUser);

ApiUser.$inject = ['$log', 'API_URL', '$http'];
function ApiUser($log, API_URL, $http) {
    return{
        userList: userList
    };

    function userList(query, callback){$log.info(query);
        return $http(_setupRequest('user/list', 'POST', query))
            .then(function(response){
                callback(response.data);
            });
    }

    function _setupRequest(uri, method, data){
        return {
            url: API_URL + uri,
            method: method,
            data: data
        };
    }
}