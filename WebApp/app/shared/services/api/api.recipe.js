angular
    .module('app.shared')
    .factory('ApiRecipe', ApiRecipe);

ApiRecipe.$inject = ['$log', 'API_URL', '$http', 'NO_IMAGE'];
function ApiRecipe($log, API_URL, $http, NO_IMAGE) {
    let recipePrefix = 'recipe';

    return{
        getRecipeList: getRecipeList,
        getRecipeById: getRecipeById,
        addNewRecipe: addNewRecipe,
        getRecipeBySuggestTitle: getRecipeBySuggestTitle
    };

    function getRecipeById(reqBody, cb){
        return $http(_setupRequest('POST', recipePrefix + '/view', reqBody))
            .then(function(res){
                _checkImage(res.data);
                cb(res.data);
            });
    }

    function getRecipeList(reqBody, cb){
        return $http(_setupRequest('POST', recipePrefix + '/list', reqBody))
            .then(function(res){
                _checkImage(res.data.data);
                cb(res.data);
            });
    }

    function addNewRecipe(reqBody, cb){
        return $http(_setupRequest('POST', recipePrefix, reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function getRecipeBySuggestTitle(reqBody, cb){
        return $http(_setupRequest('POST', recipePrefix + '/search', reqBody))
            .then(function(res){
                cb(res.data);
            });
    }

    function _checkImage(data){
        data.forEach(function(i){
            if(!i.imageUrl){
                i.imageUrl = NO_IMAGE.RECIPE;
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