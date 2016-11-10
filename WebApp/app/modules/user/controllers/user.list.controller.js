angular
    .module('app.user')
    .controller('UserListController', UserListController);

UserListController.$inject = ['$log'];
function UserListController($log) {
    var vm = this;
    vm.onPageChanged = onPageChanged;

    init();

    function init() {
        vm.pagination = {total: 10, current: 1, steps: 5};

        $log.info("User Search Page Opened");
    }

    function onPageChanged() {
        $log.info("Current page is: %s", vm.pagination.current);
        // TODO: load current page data
    }
}