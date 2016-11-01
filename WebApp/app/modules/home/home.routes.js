angular
    .module('app.home')
    .config(routes);

function routes($stateProvider) {
    $stateProvider
        .state('home', {
            parent: 'main',
            url: '/',
            controller: 'HomeController as home',
            templateUrl: 'modules/home/views/index.tpl.html'
        });
}