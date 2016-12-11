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
            if(res.videoUrl !== ""){
                res.videoUrl = String("https://www.youtube.com/embed/"+res.videoUrl.split('v=')[1]+"?rel=0");
            }
            vm.recipe = res;

            $log.info("SelectedRecipe: " + JSON.stringify(res));
        });
    }
}