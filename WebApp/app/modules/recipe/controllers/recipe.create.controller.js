angular
    .module('app.recipe')
    .controller('RecipeCreateController', RecipeCreateController);

RecipeCreateController.$inject = ['$log', 'UploadService', 'Recipe'];
function RecipeCreateController($log, UploadService, Recipe) {
    var vm = this;
    vm.addMoreIngredient = addMoreIngredient;
    vm.removeIngredient = removeIngredient;
    vm.addMoreStep = addMoreStep;
    vm.removeStep = removeStep;
    vm.uploadImage = uploadImage;
    vm.onSave = onSave;

    init();

    function init(){
        vm.recipe = {};
        vm.ingredients = [{id: 1, name: ""}];
        vm.steps = [{id: 1}];
        vm.loadCategories = Recipe.categories();
        vm.loadCuisine = Recipe.cuisine();
        vm.loadDifficultyLevel = Recipe.difficultyLevel();
    }

    function onSave(){
        vm.recipe.ingredients = vm.ingredients;
        vm.recipe.steps = vm.steps;

        $log.info(vm.recipe);
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

    function uploadImage(file) {
        UploadService.setUploadUrl("");
        UploadService.uploadImage(file);

        vm.imageName = UploadService.getGeneratedImgName();
        $log.info(vm.imageName);
    }

}