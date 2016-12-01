angular
    .module('app.shared')
    .factory('ApiRecipe', ApiRecipe);

ApiRecipe.$inject = ['$log', 'API_URL', '$http'];
function ApiRecipe($log, API_URL, $http) {
    var recipePrefix = 'recipe';

    return{
        getRecipeList: getRecipeList,
        addNewRecipe: addNewRecipe
    };

    function getRecipeList(reqBody, cb){
        return $http(_setupRequest('POST', recipePrefix + '/list', reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function addNewRecipe(reqBody, cb){
        return $http(_setupRequest('POST', recipePrefix, reqBody))
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