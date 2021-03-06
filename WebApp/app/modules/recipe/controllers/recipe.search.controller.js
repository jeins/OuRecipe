angular
    .module('app.recipe')
    .controller('RecipeSearchController', RecipeSearchController);

RecipeSearchController.$inject = ['$log', 'ApiRecipe', 'Recipe', '$mdConstant', '$stateParams'];
function RecipeSearchController($log, ApiRecipe, Recipe, $mdConstant, $stateParams) {
    var vm = this;
    vm.loadRecipe = loadRecipe;

    init();

    function init() {
        vm.filter = {sort: 'createdAt_desc', ingredients: []};
        vm.chipKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        vm.loadCategories = Recipe.categories();
        vm.loadCuisine = Recipe.cuisine();
        vm.loadSort = _getSortRecipes();
        vm.pagination = {limit: 6, current: 1, steps: 5};

        loadRecipe();
        isUriExist();
    }

    function loadRecipe(){
        var reqBody = {
            filter: vm.filter,
            currPage: vm.pagination.current,
            limit: vm.pagination.limit
        };

        $log.info("Request: " + JSON.stringify(reqBody));

        ApiRecipe.getRecipeList(reqBody, function(res){
            vm.loadNewRecipes = res.data;
            vm.pagination.total = res.pagination.totalPage;

            $log.info("RecipeList: " + JSON.stringify(res.data));
        });
    }

    function isUriExist(){
        if($stateParams.category !== undefined){
            var categoryUri = $stateParams.category;

            vm.loadCategories.forEach(function(category){
                if(category.uri === categoryUri){
                    vm.filter.category = category.name;
                    return;
                }
            });
        }

        if($stateParams.keyword !== undefined){
            vm.filter.keyword = $stateParams.keyword;
        }
    }

    function _getSortRecipes() {
        return {
            "title_desc": "Title (descending)",
            "title_asc": "Title (ascending)",
            // "rating_desc": "Ratings (highest first)",
            // "rating_asc": "Ratings (lowest first)",
            "createdAt_desc": "Create Date (newest first)",
            "createdAt_asc": "Create Date (oldest first)"
        };
    }
}