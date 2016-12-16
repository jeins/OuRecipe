angular
    .module('app.user')
    .controller('UserLoginController', UserLoginController);

UserLoginController.$inject = ['$log', '$mdDialog', '$auth', '$location', '$window'];
function UserLoginController($log, $mdDialog){
    this.showDialog = function(ev){
        $mdDialog.show({
            templateUrl: 'modules/user/views/auth/user.dialog.login.tpl.html',
            controller: dialogController,
            controllerAs: 'userLogin',
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        })
            .then(function(){
                $log.info('Dialog Login Closed');
            }, function(){
                $log.info('Dialog Login Closed');
            })
        ;
    };

    function dialogController($log, $mdDialog, $auth, $location, $window){
        var vm = this;
        vm.cancel = cancel;
        vm.login = login;

        init();

        function init(){
            vm.email = "";
            vm.password = "";
            $log.info("UserLogin dialog displayed");
        }

        function login(){
            $auth.login({ email: vm.email, password: vm.password })
                .then(function(response) {
                    if(response.data.message){
                        $log.error("Error: " + response.data.message);
                    } else{
                        $log.info("Response" + JSON.stringify(response.data));
                        $location.path('/');
                        $window.location.reload();
                    }
                })
                .catch(function(response) {
                    $log.error(response);
                });
        }

        function cancel(){
            $mdDialog.cancel();
        }
    }
}