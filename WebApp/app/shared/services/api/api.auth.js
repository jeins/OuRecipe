angular
    .module('app.shared')
    .factory('ApiAuth', ApiAuth);

ApiAuth.$inject = ['$log', 'API_URL', '$http'];
function ApiAuth($log, API_URL, $http) {
    let prefix = 'auth';

    return{
        signUp: signUp,
        loginWithEmailAndPass: loginWithEmailAndPass,
        getMe: getMe
    };

    function signUp(reqBody, cb){
        return $http(_setupRequest('POST', prefix + '/signup', reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function loginWithEmailAndPass(email, password, cb){
        return $http(_setupRequest('POST', prefix + '/login', email, password))
            .then(function(res){
                cb(res.data);
            });
    }

    function getMe(token, cb){
        return $http(_setupRequest('POST', API_URL + prefix + '/me', token))
            .then(function(res){
                cb(res.data);
            });
    }

    function _setupRequest(method, uri, data){
        return {
            url: uri,
            method: method,
            data: data
        };
    }
}