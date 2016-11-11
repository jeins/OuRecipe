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
        .state('profile_edit', {
            parent: 'main',
            url: '/profile-edit',
            controller: 'UserEditController as userEdit',
            templateUrl: 'modules/user/views/edit/index.tpl.html'
        })
    ;
}