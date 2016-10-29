angular
    .module('app.shared')
    .controller('SharedController', SharedController);

SharedController.$inject = ['$state', '$mdSidenav'];
function SharedController($state, $mdSidenav){
    let vm = this;
    vm.toggleSidenav = toggleSidenav;
    vm.closeSidenav = closeSidenav;

    function toggleSidenav(id){
        $mdSidenav(id).toggle();
    }

    function closeSidenav(id){
        $mdSidenav(id).close();
    }
}