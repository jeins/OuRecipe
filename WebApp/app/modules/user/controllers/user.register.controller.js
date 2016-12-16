angular
    .module('app.user')
    .controller('UserRegisterController', UserRegisterController);

UserRegisterController.$inject = ['$log', '$mdDialog', 'ApiAuth'];
function UserRegisterController($log, $mdDialog, ApiAuth) {
    this.showDialog = function(ev){
        $mdDialog.show({
            templateUrl: 'modules/user/views/auth/user.dialog.register.tpl.html',
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
        vm.signUp = signUp;

        init();

        function init(){
            vm.user = {
                firstName: '', lastName: '',
                email: '', password: ''
            };

            $log.info("UserLogin dialog displayed");
        }

        function signUp(){
            ApiAuth.signUp(vm.user, function(result){

            });
        }

        function cancel(){
            $mdDialog.cancel();
        }
    }
}