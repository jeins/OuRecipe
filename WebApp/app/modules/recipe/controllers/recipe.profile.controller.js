angular
    .module('app.recipe')
    .controller('RecipeProfileController', RecipeProfileController);

RecipeProfileController.$inject = ['$log'];
function RecipeProfileController($log) {
    var vm = this;

    init();

    function init(){

    }
}