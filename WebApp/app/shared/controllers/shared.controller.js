angular
    .module('app.shared')
    .controller('SharedController', SharedController);

SharedController.$inject = ['$log', '$scope', '$location', '$mdSidenav', 'Session'];
function SharedController($log, $scope, $location, $mdSidenav, Session){
    var vm = this;
    vm.toggleSidenav = toggleSidenav;
    vm.closeSidenav = closeSidenav;
    vm.selectedNav = selectedNav;
    vm.openMenu = openMenu;

    //GlobalFunction
    $scope.isUserFavorite = isUserFavorite;

    init();

    function init() {
        $scope.session = Session.getSession();
        $scope.isUserLogedIn = $scope.session.loggedIn;

        $log.info("UserSession: " + JSON.stringify($scope.session));
    }

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

    function isUserFavorite(favorites){
        let isUserFavorite = false;

        favorites.forEach(function(favorite){
            if(favorite.userId == $scope.session.user.id){
                isUserFavorite = true;
            }
        });

        return isUserFavorite;
    }

    function openMenu($mdOpenMenu, ev){
        vm.originatorEv = ev;
        $mdOpenMenu(ev);
    }
}