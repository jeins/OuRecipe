angular
    .module('app.user')
    .config(routes);

function routes($stateProvider) {
    $stateProvider
        .state('user_list', {
            parent: 'main',
            url: '/user-list',
            controller: 'UserListController as userList',
            templateUrl: 'modules/user/views/list/index.tpl.html'
        })
    ;
}