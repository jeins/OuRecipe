angular
    .module('app.shared')
    .controller('SharedController', SharedController);

SharedController.$inject = ['$log', '$location', '$mdSidenav'];
function SharedController($log, $location, $mdSidenav){
    var vm = this;
    vm.toggleSidenav = toggleSidenav;
    vm.closeSidenav = closeSidenav;
    vm.selectedNav = selectedNav;
    vm.openMenu = openMenu;

    function toggleSidenav(id){
        $mdSidenav(id).toggle();
        $log.info('ToogleSideNav: %s ', id);
    }

    function closeSidenav(id){
        $mdSidenav(id).close();
        $log.info('CloseSideNav: %s ', id);
    }

    function selectedNav(uri) {
        $log.info("current uri: " + $location.path());

        if($location.path().includes(uri)){
            return true;
        } else if(uri == "home" && $location.path() == '/'){
            return true;
        }

        return false;
    }

    function openMenu($mdOpenMenu, ev){
        vm.originatorEv = ev;
        $mdOpenMenu(ev);
    }
}