angular
    .module('app.shared')
    .factory('ApiFavorite', ApiFavorite);

ApiFavorite.$inject = ['$log', 'API_URL', '$http', 'NO_IMAGE'];
function ApiFavorite($log, API_URL, $http, NO_IMAGE) {
    let uriPrefix = 'auth/favorite';

    return{
        getFavoriteRecipeByUserId: getFavoriteRecipeByUserId,
        addFavoriteRecipe: addFavoriteRecipe
    };

    function getFavoriteRecipeByUserId(reqBody, cb) {
        return $http(_setupRequest('POST', uriPrefix + '/recipe', reqBody))
            .then(function(res){
                _checkImage(res.data.data);
                cb(res.data);
            });
    }

    function addFavoriteRecipe(reqBody, cb){
        return $http(_setupRequest('POST', uriPrefix, reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function _checkImage(data){
        data.forEach(function(i){
            if(!i.recipe.imageUrl){
                i.recipe.imageUrl = NO_IMAGE.RECIPE;
            }
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