angular
    .module('app.shared', [
        'ngCookies',
    ])
    .config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider){
}