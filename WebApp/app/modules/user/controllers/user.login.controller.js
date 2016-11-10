angular
    .module('app.user')
    .controller('UserLoginController', UserLoginController);

UserLoginController.$inject = ['$log', '$mdDialog'];
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

    function dialogController($log, $mdDialog){
        var vm = this;
        vm.cancel = cancel;

        init();

        function init(){
            vm.email = "";
            vm.password = "";
            $log.info("UserLogin dialog displayed");
        }

        function cancel(){
            $mdDialog.cancel();
        }
    }
}