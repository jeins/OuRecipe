angular
    .module('app.recipe')
    .controller('RecipeCreateController', RecipeCreateController);

RecipeCreateController.$inject = ['$log'];
function RecipeCreateController($log) {
    var vm = this;
    vm.addMoreIngredient = addMoreIngredient;
    vm.removeIngredient = removeIngredient;
    vm.addMoreStep = addMoreStep;
    vm.removeStep = removeStep;

    init();

    function init(){
        vm.recipe = [];
        vm.ingredients = [{id: 1, name: ""}];
        vm.steps = [{id: 1}];
    }

    function addMoreIngredient(){
        var newId = vm.ingredients.length+1;
        vm.ingredients.push({'id': newId});
    }

    function removeIngredient() {
        var lastId = vm.ingredients.length-1;
        vm.ingredients.splice(lastId);
    }

    function addMoreStep() {
        var newId = vm.steps.length+1;
        vm.steps.push({'id': newId});
    }

    function removeStep() {
        var lastId = vm.steps.length-1;
        vm.steps.splice(lastId);
    }
}