angular
    .module('app.recipe')
    .directive('addFavorite', AddFavoriteDirective);

AddFavoriteDirective.$inject = ['ApiFavorite'];
function AddFavoriteDirective(ApiFavorite){

    return {
        restrict: 'A',
        link: addRecipeToFavorite
    };

    function addRecipeToFavorite(scope, elem, attr){
        var userId = attr.userId;
        var recipeId = attr.recipeId;

        elem.on('click', function (){
            let reqBody = {
                data: {
                    userId: userId,
                    recipeId: recipeId
                }
            };

            ApiFavorite.addFavoriteRecipe(reqBody, function(res){
                elem.addClass('marked');
            });
        })
    }
}