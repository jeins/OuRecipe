angular
    .module('app.recipe')
    .controller('RecipeProfileController', RecipeProfileController);

RecipeProfileController.$inject = ['$log', '$stateParams', '$location', 'ApiRecipe', '$sce'];
function RecipeProfileController($log, $stateParams, $location, ApiRecipe, $sce) {
    let vm = this;
    vm.trustSrc = trustSrc;

    init();

    function init(){
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

            $log.info("SelectedRecipe: " + JSON.stringify(res));
        });
    }
}