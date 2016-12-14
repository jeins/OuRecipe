angular
    .module('app.shared')
    .factory('ApiFavorite', ApiFavorite);

ApiFavorite.$inject = ['$log', 'API_URL', '$http'];
function ApiFavorite($log, API_URL, $http) {
    let uriPrefix = 'favorite';

    return{
        getFavoriteRecipeByUserId: getFavoriteRecipeByUserId,
        addFavoriteRecipe: addFavoriteRecipe
    };

    function getFavoriteRecipeByUserId(reqBody, cb) {
        return $http(_setupRequest('POST', uriPrefix + '/recipe', reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function addFavoriteRecipe(reqBody, cb){
        return $http(_setupRequest('POST', uriPrefix, reqBody))
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