angular
    .module('app.user')
    .controller('UserListController', UserListController);

UserListController.$inject = ['$log', 'ApiUser'];
function UserListController($log, ApiUser) {
    var vm = this;
    vm.onPageChanged = onPageChanged;

    init();

    function init() {
        vm.pagination = {current: 1, steps: 5, limit: 9};

        _loadUsers();
    }

    function onPageChanged() {
        _loadUsers();

        $log.info("Current page is: %s", vm.pagination.current);
    }

    function _loadUsers(){
        ApiUser.userList({limit: vm.pagination.limit, currPage: vm.pagination.current}, function(response){
            vm.loadUsers = response.data;
            vm.pagination.total = response.pagination.totalPage;

            $log.info("Response - User List: %s", JSON.stringify(response.data));
        });
    }
}