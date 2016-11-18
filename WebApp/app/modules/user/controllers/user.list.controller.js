angular
    .module('app.user')
    .controller('UserListController', UserListController);

UserListController.$inject = ['$log', 'ApiUser'];
function UserListController($log, ApiUser) {
    var vm = this;
    vm.onPageChanged = onPageChanged;

    init();

    function init() {
        vm.pagination = {total: 10, current: 1, steps: 5};
        ApiUser.userList({limit: 4, offset: 4}, function(response){
           $log.info(response);
        });
        $log.info("User Search Page Opened");
    }

    function onPageChanged() {
        $log.info("Current page is: %s", vm.pagination.current);
        // TODO: load current page data
    }
}