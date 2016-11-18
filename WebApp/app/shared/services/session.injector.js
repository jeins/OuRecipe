angular
    .module('app.shared')
    .factory('SessionInjector', SessionInjector);

SessionInjector.$inject = ['$log', '$cookies'];
function SessionInjector($log, $cookies) {
    return {
        request: function(config){
            var csrf_token = $cookies.get('csrf-token');

            config.headers['x-csrf-token'] = csrf_token;

            $log.info("added csrf-token: %s, to header.", csrf_token);
            return config;
        }
    };
}