angular
    .module('app.recipe')
    .config(routes);

function routes($stateProvider) {
    $stateProvider
        .state('recipe_profile', {
            parent: 'main',
            url: '/recipe-profile',
            controller: 'RecipeProfileController as recipeProfile',
            templateUrl: 'modules/recipe/views/profile/index.tpl.html'
        })
        .state('recipe_create', {
            parent: 'main',
            url: '/recipe-create',
            controller: 'RecipeCreateController as recipeCreate',
            templateUrl: 'modules/recipe/views/create/index.tpl.html'
        })
    ;
}