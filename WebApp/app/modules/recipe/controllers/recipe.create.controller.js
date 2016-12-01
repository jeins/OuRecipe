angular
    .module('app.recipe')
    .controller('RecipeCreateController', RecipeCreateController);

RecipeCreateController.$inject = ['$log', 'UploadService', 'Recipe', 'ApiRecipe', '$state'];
function RecipeCreateController($log, UploadService, Recipe, ApiRecipe, $state) {
    let vm = this;
    vm.addMoreIngredient = addMoreIngredient;
    vm.removeIngredient = removeIngredient;
    vm.addMoreStep = addMoreStep;
    vm.removeStep = removeStep;
    vm.uploadImage = uploadImage;
    vm.onSave = onSave;

    init();

    function init(){
        vm.recipe = {userId: 1}; //TODO:: need fix
        vm.ingredients = [{id: 1, name: ""}];
        vm.steps = [{id: 1}];
        vm.loadCategories = Recipe.categories();
        vm.loadCuisine = Recipe.cuisine();
        vm.loadDifficultyLevel = Recipe.difficultyLevel();
    }

    function onSave(){
        vm.recipe.ingredients = vm.ingredients;
        vm.recipe.steps = vm.steps;

        ApiRecipe.addNewRecipe(vm.recipe, function (result) {
            if(result){
                $state.go('recipe_profile', {recipeId: result.id});
            }
        });

        $log.info(vm.recipe);
    }

    function addMoreIngredient(){
        let newId = vm.ingredients.length+1;
        vm.ingredients.push({'id': newId});
    }

    function removeIngredient() {
        let lastId = vm.ingredients.length-1;
        vm.ingredients.splice(lastId);
    }

    function addMoreStep() {
        let newId = vm.steps.length+1;
        vm.steps.push({'id': newId});
    }

    function removeStep() {
        let lastId = vm.steps.length-1;
        vm.steps.splice(lastId);
    }

    function uploadImage(file) {
        UploadService.setUploadUrl("");
        UploadService.uploadImage(file);

        vm.imageName = UploadService.getGeneratedImgName();
        $log.info(vm.imageName);
    }

}