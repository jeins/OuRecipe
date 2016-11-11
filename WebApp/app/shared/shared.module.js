angular
    .module('app.shared', [
        'ngCookies', 'ngFileUpload'
    ])
    .config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider){
}