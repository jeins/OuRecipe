angular
    .module('app.user')
    .controller('UserLogoutController', UserLogoutController);

UserLogoutController.$inject = ['$log', '$auth', '$location', '$window'];
function UserLogoutController($log, $auth, $location, $window){
    var vm = this;
    vm.logout = logout;

    function logout(){
        if(!$auth.isAuthenticated()){
            return;
        }

        $auth.logout()
            .then(function(){
                $log.info("UserLogout");

                $location.path('/');
                $window.location.reload();
            });
    }
}