angular
    .module('app', [
        //libraries
        'ui.router', 'ngMaterial',
        'satellizer',
        'pascalprecht.translate',

        //modules
        'app.config', 'app.shared',
        'app.home', 'app.user', 'app.recipe'
    ])
    .config(['$logProvider', '$provide', '$translateProvider', 'translation', '$mdAriaProvider', '$httpProvider', '$authProvider',
        function($logProvider, $provide, $translateProvider, translation, $mdAriaProvider, $httpProvider, $authProvider){
            // Inject interceptors
            $httpProvider.interceptors.push('SessionInjector');

            // Setup Logging/Debug
            $logProvider.debugEnabled(true);

            // Globally disables all ARIA warnings.
            $mdAriaProvider.disableWarnings();

            $provide.decorator('$log', function($delegate) {
                var origInfo = $delegate.info, origLog = $delegate.log,
                    origError = $delegate.error, origWarn = $delegate.warn;

                $delegate.info = function(){if($logProvider.debugEnabled()) origInfo.apply(null, arguments);};
                $delegate.log = function(){if($logProvider.debugEnabled()) origLog.apply(null, arguments);};
                $delegate.error = function(){if($logProvider.debugEnabled()) origError.apply(null, arguments);};
                $delegate.warn = function(){if($logProvider.debugEnabled()) origWarn.apply(null, arguments);};

                return $delegate;
            });

            // Setup Translation
            $translateProvider
                .useStaticFilesLoader({
                    prefix: translation.path,
                    suffix: translation.suffix
                })
                .useSanitizeValueStrategy(translation.sanitize)
                .preferredLanguage(translation.default)
            ;

            // Auth
            $authProvider.loginUrl = '/auth/login';
            $authProvider.signupUrl = '/auth/signup';
        }
    ])
;