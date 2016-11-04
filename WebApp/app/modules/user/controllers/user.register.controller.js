angular
    .module('app.user')
    .controller('UserRegisterController', UserRegisterController);

UserRegisterController.$inject = ['$log', '$mdDialog'];
function UserRegisterController($log, $mdDialog) {
    this.showDialog = function(ev){
        $mdDialog.show({
            templateUrl: 'modules/user/views/user.dialog.register.tpl.html',
            controller: dialogController,
            controllerAs: 'userRegister',
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        })
            .then(function(){
                $log.info('Dialog Login Closed');
            })
        ;
    };

    function dialogController($log, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;

        init();

        function init(){
            vm.firstName = "";
            vm.lastName = "";
            vm.email = "";
            vm.password = "";

            $log.info("UserLogin dialog displayed");
        }

        function cancel(){
            $mdDialog.cancel();
        }
    }
}