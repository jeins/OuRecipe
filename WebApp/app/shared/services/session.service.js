angular
    .module('app.shared')
    .factory('Session', Session);

Session.$inject = ['$log', '$window', 'TOKEN_KEY', 'ApiAuth'];
function Session($log, $window, TOKEN_KEY, ApiAuth) {
    const session = {};

    init();

    return {
        getSession: getSession,
        getUser: getUser
    };

    function init(){
        let token = $window.localStorage[TOKEN_KEY];
        if(token){
            setSession(token);
        } else{
            resetSession();
        }
    }

    function getUser(){
        return session.user;
    }

    function setSession(token){
        session.loggedIn = true;
        ApiAuth.getMe({token: token}, function(result){
            session.user = result;
        });
        $log.info("SessionSet");
    }

    function getSession(){
        return session;
    }

    function resetSession(){
        $log.info("SessionReset");

        session.loggedIn = false;
        session.user = '';
    }
}