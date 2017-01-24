angular
    .module('app.recipe')
    .controller('RecipeCreateController', RecipeCreateController);

RecipeCreateController.$inject = ['$log', 'UploadService', 'Recipe', 'ApiRecipe', '$state', 'API_URL', 'IMG_URL_RECIPE', 'Session'];
function RecipeCreateController($log, UploadService, Recipe, ApiRecipe, $state, API_URL, IMG_URL_RECIPE, Session) {
    let vm = this;
    vm.addMoreIngredient = addMoreIngredient;
    vm.removeIngredient = removeIngredient;
    vm.addMoreStep = addMoreStep;
    vm.removeStep = removeStep;
    vm.uploadImage = uploadImage;
    vm.onSave = onSave;

    init();

    function init(){
        vm.user = Session.getUser();
        vm.recipe = {userId: vm.user.id};
        vm.ingredients = [{id: 1, name: ""}];
        vm.steps = [{id: 1}];
        vm.loadCategories = Recipe.categories();
        vm.loadCuisine = Recipe.cuisine();
        vm.loadDifficultyLevel = Recipe.difficultyLevel();
        vm.imageName = null;
    }

    function onSave(){
        vm.recipe.ingredients = vm.ingredients;
        vm.recipe.steps = vm.steps;
        vm.recipe.imageUrl = (vm.imageName === null) ? '' : IMG_URL_RECIPE + vm.imageName;

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
        UploadService.setUploadUrl(API_URL + 'image/upload/recipe');
        UploadService.uploadImage(file, function(res){
            if(res.data.success){
                vm.imageName = UploadService.getGeneratedImgName();
                vm.imageUrl = IMG_URL_RECIPE + vm.imageName;

                $log.info("uploaded image name" + vm.imageName);
            }
        });
    }

}