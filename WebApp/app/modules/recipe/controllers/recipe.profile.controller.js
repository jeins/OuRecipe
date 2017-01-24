angular
    .module('app.recipe')
    .controller('RecipeProfileController', RecipeProfileController);

RecipeProfileController.$inject = ['$log', '$stateParams', '$location', 'ApiRecipe', '$sce', 'ApiFavorite', 'Session'];
function RecipeProfileController($log, $stateParams, $location, ApiRecipe, $sce, ApiFavorite, Session) {
    let vm = this;
    vm.trustSrc = trustSrc;
    vm.addFavorite = addFavorite;

    init();

    function init(){
        vm.currUser = Session.getUser();
        vm.recipeId = $stateParams.recipeId;

        if(vm.recipeId === undefined) $location.path('/recipe-search');

        loadRecipeData();
    }

    function trustSrc(src){
        return $sce.trustAsResourceUrl(src);
    }

    function loadRecipeData(){
        ApiRecipe.getRecipeById({recipeId: vm.recipeId}, function(res){
            vm.recipe = res;

            _isUserFavorite();

            $log.info("SelectedRecipe: " + JSON.stringify(res));
        });
    }

    function addFavorite(){
        let reqBody = {
            data: {
                userId: vm.currUser.id,
                recipeId: vm.recipe.id
            }
        };

        ApiFavorite.addFavoriteRecipe(reqBody, function(res){
            vm.favoriteStyle = {"color": "red"};
        });
    }

    function _isUserFavorite(){
        vm.recipe.favorites.forEach(function(favorite){console.log(favorite.userId); console.log(vm.currUser.id);
            if(favorite.userId === vm.currUser.id){
                vm.favoriteStyle = {"color": "red"};
            }
        });
    }
}