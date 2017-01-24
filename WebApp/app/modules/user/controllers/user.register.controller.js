angular
    .module('app.user')
    .controller('UserRegisterController', UserRegisterController);

UserRegisterController.$inject = ['$log', '$mdDialog', '$auth', '$location', '$window', '$mdToast', '$document'];
function UserRegisterController($log, $mdDialog) {
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

    function dialogController($log, $mdDialog, $auth, $location, $window, $mdToast, $document) {
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
            $auth.signup(vm.user)
                .then(function(response) {
                    if(response.data.message){
                        $log.error("Error: " + response.data.message);
                        _displayToast(response.data.message);
                    } else{
                        $auth.login({ email: vm.user.email, password: vm.user.password })
                            .then(function(response) {
                                if(response.data.message){
                                    $log.error("Error: " + response.data.message);
                                    _displayToast(response.data.message);
                                } else{
                                    $log.info("Response" + JSON.stringify(response.data));
                                    $location.path('/');
                                    $window.location.reload();
                                }
                            })
                            .catch(function(response) {
                                $log.error(response);
                                _displayToast(response.data.message);
                            });
                    }
                })
                .catch(function(response) {
                    $log.error(response);
                    _displayToast(response.data.message);
                });
        }

        function cancel(){
            $mdDialog.cancel();
        }

        function _displayToast(message){
            $mdToast.show(
                $mdToast.simple({
                    textContent : message,
                    parent : $document[0].querySelector('#toastContainer'),
                    position: 'top right',
                    hideDelay: 3000
                })
            );
        }
    }
}