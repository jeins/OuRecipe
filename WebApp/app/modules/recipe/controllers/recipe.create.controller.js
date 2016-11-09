angular
    .module('app.recipe')
    .controller('RecipeCreateController', RecipeCreateController);

RecipeCreateController.$inject = ['$log', 'Upload'];
function RecipeCreateController($log, Upload) {
    var vm = this;
    vm.addMoreIngredient = addMoreIngredient;
    vm.removeIngredient = removeIngredient;
    vm.addMoreStep = addMoreStep;
    vm.removeStep = removeStep;
    vm.uploadImage = uploadImage;

    init();

    function init(){
        vm.recipe = [];
        vm.ingredients = [{id: 1, name: ""}];
        vm.steps = [{id: 1}];
        vm.imageName = _generateHash("getcurrentuseremail");
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
        if(_isMimeTypeAllow(file.name) && !file.$error){
            file = Upload.rename(file, _changeImgName(file.name));

            Upload.upload({
                url: 'assets/recipes',
                data: {file: file}
            }).then(function(response){$log.info(response)
            });
        }
    }

    function _changeImgName(name){
        var tmpName = name.toLowerCase().split('.');
        return vm.imageName + "." + tmpName[tmpName.length-1];
    }

    function _isMimeTypeAllow(name){
        var res = name.toLowerCase().split('.');
        return !!(res[res.length - 1] == 'jpg' || res[res.length - 1] == 'png' || res[res.length - 1] == 'jpeg');
    }

    function _generateHash(str)
    {
        var x = (str.charCodeAt(0) * 719) % 1138;
        var hash = 837;
        var i;
        for (i = 1; i <= str.length; i++)
            hash = (hash * i + 5 + (str.charCodeAt(i - 1) - 64) * x) % 98503;
        return hash.toString();
    }

}