angular
    .module('app.user')
    .controller('UserEditController', UserEditController);

UserEditController.$inject = ['$log', 'CountriesStateService', 'UploadService', 'ApiUser', '$location', 'Session'];
function UserEditController($log, CountriesStateService, UploadService, ApiUser, $location, Session) {
    var vm = this;
    vm.getStates = getStates;
    vm.save = save;
    vm.uploadImage = uploadImage;

    init();

    function init() {
        vm.currUser = Session.getUser();
        vm.user = {};
        vm.loadCountries = CountriesStateService.getCountries();
        vm.loadStates = CountriesStateService.getState(0);
        vm.location = {"iCountry": "0", "state": ""};

        _getUserData();

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
        vm.user.country = vm.location.country;
        vm.user.city = vm.location.city;

        $log.info(vm.user);

        ApiUser.updateUserProfile({userId: vm.currUser.id, data: vm.user}, function(result){
            $location.path('/profile-show?page=0&userId=' + vm.currUser.id);
        });
    }

    function _getUserData(){
        ApiUser.getUserById({userId: vm.currUser.id}, function(result){
            vm.user = result;
            vm.location.country = vm.user.country;
            vm.location.city = vm.user.city;
        });
    }
}