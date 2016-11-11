angular
    .module('app.user')
    .controller('UserEditController', UserEditController);

UserEditController.$inject = ['$log', 'CountriesStateService', 'UploadService'];
function UserEditController($log, CountriesStateService, UploadService) {
    var vm = this;
    vm.getStates = getStates;
    vm.save = save;
    vm.uploadImage = uploadImage;

    init();

    function init() {
        vm.user = {};
        vm.loadCountries = CountriesStateService.getCountries();
        vm.loadStates = CountriesStateService.getState(0);
        vm.location = {"iCountry": "0", "state": ""};

        $log.info(vm.location.iCountry);
        $log.info("Edit User Profile Page Opened");
    }

    function uploadImage(file){
        UploadService.setUploadUrl("");
        UploadService.uploadImage(file);
    }

    function getStates() {
        var state = CountriesStateService.getState(vm.location.iCountry);
        vm.location.country = vm.loadCountries[vm.location.iCountry];
        vm.loadStates = (vm.location.iCountry === 0) ? '' : state.split('|');
        $log.info(vm.loadStates);
    }

    function save(){
        vm.user.location = vm.location;
        $log.info(vm.user);
    }
}