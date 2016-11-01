angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'app.config',
        'app.shared',
        'app.home'
    ])
    .config(['$logProvider', '$provide',
        function($logProvider, $provide){
            // Setup Logging/Debug
            $logProvider.debugEnabled(true);

            $provide.decorator('$log', function($delegate) {
                var origInfo = $delegate.info, origLog = $delegate.log,
                    origError = $delegate.error, origWarn = $delegate.warn;

                $delegate.info = function(){if($logProvider.debugEnabled()) origInfo.apply(null, arguments);};
                $delegate.log = function(){if($logProvider.debugEnabled()) origLog.apply(null, arguments);};
                $delegate.error = function(){if($logProvider.debugEnabled()) origError.apply(null, arguments);};
                $delegate.warn = function(){if($logProvider.debugEnabled()) origWarn.apply(null, arguments);};

                return $delegate;
            });
        }
    ])
;