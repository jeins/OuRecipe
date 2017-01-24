angular
    .module('app.home')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$log', 'Recipe', 'ApiRecipe', 'ApiUser'];
function HomeController($log, Recipe, ApiRecipe, ApiUser) {
    var vm = this;
    vm.loadNewRecipes = loadNewRecipes;
    vm.loadTopAuthors = loadTopAuthors;

    init();

    function init(){
        vm.loadCategories = Recipe.categories();

        loadNewRecipes();
        loadTopAuthors();

        $log.info(vm.session);
    }

    function loadNewRecipes(){
        var reqBody = {
            filter: {sort: "createdAt_desc", ingredients: []},
            currPage: 1,
            limit: 3
        };

        ApiRecipe.getRecipeList(reqBody, function(res){
            vm.loadNewRecipes = res.data;

            $log.info("RecipeList: " + JSON.stringify(res.data));
        });
    }

    function loadTopAuthors(){
        ApiUser.getTopUser(function(res){
            vm.loadTopAuthors = res;

            $log.info("TopRecipe: " + JSON.stringify(res));
        });
    }
}