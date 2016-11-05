angular
    .module('app.recipe')
    .config(routes);

function routes($stateProvider) {
    $stateProvider
        .state('recipe', {
            parent: 'main',
            url: '/recipe-profile',
            controller: 'RecipeProfileController as recipeProfile',
            templateUrl: 'modules/recipe/views/profile/index.tpl.html'
        });
}