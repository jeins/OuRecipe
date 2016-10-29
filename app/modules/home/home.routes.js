angular
    .module('app.home')
    .config(routes);

function routes($stateProvider) {
    $stateProvider
        .state('home', {
            parent: 'main',
            url: '/',
            controller: 'HomeController as vm',
            templateUrl: 'modules/home/index.tpl.html'
        });
}