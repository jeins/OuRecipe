angular
    .module('app.shared')
    .controller('SharedController', SharedController);

SharedController.$inject = ['$log', '$state', '$mdSidenav'];
function SharedController($log, $state, $mdSidenav){
    let vm = this;
    vm.toggleSidenav = toggleSidenav;
    vm.closeSidenav = closeSidenav;

    function toggleSidenav(id){
        $mdSidenav(id).toggle();
        $log.info('ToogleSideNav: %s ', id);
    }

    function closeSidenav(id){
        $mdSidenav(id).close();
        $log.info('CloseSideNav: %s ', id);
    }
}