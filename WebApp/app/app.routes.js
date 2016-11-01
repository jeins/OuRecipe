angular
    .module('app')
    .config(routes);

function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('root', {
            abstract: true,
            url: '',
            template: '<ui-view />'
        });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}